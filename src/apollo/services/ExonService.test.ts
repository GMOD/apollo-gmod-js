import {addTranscript, annotationEditorCommand} from './ProteinCodingService'
import {
  addOrganismWithDirectory,
  deleteOrganism,
  deleteOrganismFeatures,
  getOrganism,
  removeEmptyCommonDirectory
} from './OrganismService'
import {Organism} from '../domain/Organism'
import {addUser, deleteUser, getUser} from './UserService'
import {User} from '../domain/User'
import {Role} from '../domain/Role'
import {sleep} from '../functions/Timing'
import {GenomeAnnotationGroup} from '../domain/GenomeAnnotationGroup'
import {getSequenceForFeatures} from './SequenceService'

const TEST_USER = 'test@test.com'
const TEST_ORGANISM = 'testAnimal'
const TEST_SEQUENCE = 'honeybee-Group1.10'
const LOCAL_APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`
const APOLLO_DATA = process.env.DOCKER_CI ? '/data' : LOCAL_APOLLO_DATA

/**
 * From ExonServiceIntegrationSpec
 */
test('Create 2 exons on a transcript and delete one, confirm boundaries mapped', async () => {
  // add transcript
  // // verify transcript
  // 1. get features on sequence (should be none)
  const getFeaturesCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'sequence': 'Group1.10'
  }
  const annotationsFoundResponse0 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound0 = new GenomeAnnotationGroup(annotationsFoundResponse0)
  expect(genomeAnnotationFound0.features.length).toEqual(0)


  // 2. add transcript
  const addTranscriptCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'sequence': 'Group1.10',
    'features': [{
      'location': {'fmin': 2, 'fmax': 25, 'strand': 1},
      'type': {'cv': {'name': 'sequence'}, 'name': 'mRNA'},
      'name': 'GB40856-RA',
      'children': [{
        'location': {'fmin': 5, 'fmax': 10, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 15, 'fmax': 20, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }]
    }]
  }
  const returnObject = await addTranscript(addTranscriptCommand)
  console.log('return object`')
  console.log(JSON.stringify(returnObject))
  const returnGenomeAnnotationGroup = new GenomeAnnotationGroup(returnObject)
  expect(returnGenomeAnnotationGroup.features.length).toEqual(1)
  console.log('return features',returnGenomeAnnotationGroup.features[0].children)
  const returnFeature = returnGenomeAnnotationGroup.features[0]
  expect(returnFeature.name).toEqual('GB40856-RA-00001')
  // 2 exons, 1 CDS, 2 non-canonical five-prime splice sites, 1 non-canonical three-prime splice sites
  expect(returnFeature.children.length).toEqual(6)


  // 3. get features on sequence (should be this one)
  const annotationsFoundResponse1 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  console.log('annotationsFoundResponse1',JSON.stringify(annotationsFoundResponse1))
  const genomeAnnotationFound1 = new GenomeAnnotationGroup(annotationsFoundResponse1)
  expect(genomeAnnotationFound1.features.length).toEqual(1)
  const addedFeature1 = genomeAnnotationFound1.features[0]
  expect(addedFeature1.location?.fmin).toEqual(2)
  expect(addedFeature1.location?.fmax).toEqual(25)
  expect(addedFeature1.children?.length).toEqual(6)
  expect(addedFeature1.uniqueName).toBeDefined()

  // delete the right exon . . . S
  const rightExon = addedFeature1.children[2]
  console.log('delete right exon',rightExon)
  const uniqueNameToDelete = rightExon.uniqueName



  // 4. delete feature
  const deleteExonCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'features': [{'uniqueName': uniqueNameToDelete}]
  }
  const deleteFeatureResponse = await annotationEditorCommand(deleteExonCommand, 'deleteExon')
  console.log('delete feature response)')
  console.log(deleteFeatureResponse)


  // 5. get features on sequence (should be none)
  const annotationsFoundResponse2 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound2 = new GenomeAnnotationGroup(annotationsFoundResponse2)
  expect(addedFeature1.location?.fmin).toEqual(2)
  expect(addedFeature1.location?.fmax).toEqual(25)
  expect(addedFeature1.children?.length).toEqual(3)

}, 1000)


beforeAll(async () => {
  const result = await removeEmptyCommonDirectory()

  // 0. if user does not exist
  let user = await getUser(TEST_USER) as User
  if (!user) {
    const addedUser = await addUser(TEST_USER, 'Admin', 'User', Role.ADMIN,) as User
    sleep(1000)
    user = await getUser(TEST_USER) as User
  }

  // 3. if organism with directory exists
  let organism: Organism = await getOrganism(TEST_ORGANISM) as Organism

  // 4. add organism directory
  if (!organism || organism.commonName !== TEST_ORGANISM) {
    await addOrganismWithDirectory(
      `${APOLLO_DATA}/sequences/honeybee-Group1.10/`,
      TEST_ORGANISM
    )
    organism = await getOrganism(TEST_ORGANISM) as Organism
  }
})

afterAll(async () => {

  // TODO:
  let organism = await getOrganism(TEST_ORGANISM) as Organism

  if (organism && organism.commonName === TEST_ORGANISM) {
    const totalDeleted = await deleteOrganismFeatures(TEST_ORGANISM)
    organism = await deleteOrganism(TEST_ORGANISM) as Organism
  }
  let user = await getUser(TEST_USER) as User
  if (user && user.username === TEST_USER) {
    user = await deleteUser(TEST_USER) as User
  }

  // sleep(3000)

  user = await getUser(TEST_USER) as User
  organism = await getOrganism(TEST_ORGANISM) as Organism
})
