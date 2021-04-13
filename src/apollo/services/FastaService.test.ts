import {addTranscript, annotationEditorCommand} from './ProteinCodingService'
import {GenomeAnnotationGroup} from '../domain/GenomeAnnotationGroup'
import {getSequenceForFeatures} from './SequenceService'
import {
  addOrganismWithDirectory, deleteOrganism,
  deleteOrganismFeatures,
  getOrganism,
  removeEmptyCommonDirectory
} from './OrganismService'
import {addUser, deleteUser, getUser} from './UserService'
import {User} from '../domain/User'
import {Role} from '../domain/Role'
import {sleep} from '../functions/Timing'
import {Organism} from '../domain/Organism'

const TEST_USER = 'test@test.com'
const TEST_ORGANISM = 'testAnimal'
const TEST_SEQUENCE = 'Group1.10'
const LOCAL_APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`
const APOLLO_DATA = process.env.DOCKER_CI ? '/data' : LOCAL_APOLLO_DATA

/*
* From FastaHandlerServiceIntegrationSpec
*/
test('write a fasta of a simple gene model', async () => {
  // add transcript
  // // verify transcript
  // 1. get features on sequence (should be none)
  const getFeaturesCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'sequence': TEST_SEQUENCE
  }
  const annotationsFoundResponse0 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound0 = new GenomeAnnotationGroup(annotationsFoundResponse0)
  expect(genomeAnnotationFound0.features.length).toEqual(0)

  // 2. add transcript
  const addTranscriptCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'sequence': TEST_SEQUENCE,
    'features': [
      {
        'location': {'fmin': 1216824, 'fmax': 1235616, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'mRNA'},
        'name': 'GB40856-RA',
        'children': [
          {
            'location': {'fmin': 1216824, 'fmax': 1235534, 'strand': 1},
            'type': {'cv': {'name': 'sequence'}, 'name': 'CDS'}
          },
          {
            'location': {'fmin': 1216824, 'fmax': 1216850, 'strand': 1},
            'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
          },
          {
            'location': {'fmin': 1224676, 'fmax': 1224823, 'strand': 1},
            'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
          },
          {
            'location': {'fmin': 1228682, 'fmax': 1228825, 'strand': 1},
            'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
          },
          {
            'location': {'fmin': 1235237, 'fmax': 1235396, 'strand': 1},
            'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
          },
          // {
          //   'location': {'fmin': 1235534, 'fmax': 1235616, 'strand': 1},
          //   'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
          // },
          {
            'location': {'fmin': 1235487, 'fmax': 1235616, 'strand': 1},
            'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
          },
        ]
      }]
  }
  const returnObject = await addTranscript(addTranscriptCommand)
  const returnGenomeAnnotationGroup = new GenomeAnnotationGroup(returnObject)

  expect(returnGenomeAnnotationGroup.features.length).toEqual(1)
  const returnFeature = returnGenomeAnnotationGroup.features[0]
  expect(returnFeature.name).toEqual('GB40856-RA-00001')
  // 2 exons, 1 CDS, 2 non-canonical five-prime splice sites, 1 non-canonical three-prime splice sites
  expect(returnFeature.children.length).toEqual(6)


  // 3. get features to confirm it is addd
  const annotationsFoundResponse1 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound1 = new GenomeAnnotationGroup(annotationsFoundResponse1)
  expect(genomeAnnotationFound1.features.length).toEqual(1)
  const addedFeature1 = genomeAnnotationFound1.features[0]
  expect(addedFeature1.location?.fmin).toEqual(1216824)
  expect(addedFeature1.location?.fmax).toEqual(1235616)
  expect(addedFeature1.children?.length).toEqual(6)
  expect(addedFeature1.uniqueName).toBeDefined()

  // 4. get and confirm sequence
  const proteinSequenceResidues = await getSequenceForFeatures(TEST_ORGANISM,TEST_SEQUENCE,returnFeature.uniqueName as string,'peptide') as string
  expect(proteinSequenceResidues).toEqual('MARDIHRQSLRTEQPSGLDTGGVRFELSRALDLWARNSKLTFQEVNSDRADILVYFHRGYHGDGYPFDGRGQILAHAFFPGRDRGGDVHFDEEEIWLLQGDNNEEGTSLFAVAAHEFGHSLGLAHSSVPGALMYPWYQGLSSNYELPEDDRHGIQQMYEINQDIFFFIFFSHD')

  // 5. write file?
  // TODO: . .
})
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

