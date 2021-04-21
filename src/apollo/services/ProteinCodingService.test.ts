import {addTranscript} from './ProteinCodingService'
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
import {GenomeAnnotationGroup} from '../domain/GenomeAnnotationGroup'
import {getSequenceForFeatures} from './SequenceService'
import {annotationEditorCommand} from './ApolloAPIService'
import {ADMIN_PASS, ADMIN_USER} from './TestCredentials'

const TEST_USER = 'test@test.com'
const TEST_PASS = 'secret'
const TEST_ORGANISM = 'testAnimal'
const TEST_SEQUENCE = 'honeybee-Group1.10'
const LOCAL_APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`
const APOLLO_DATA = process.env.DOCKER_CI ? '/data' : LOCAL_APOLLO_DATA
const authCommand = <JSON><unknown>{username:TEST_USER,password:'asf',organism:TEST_ORGANISM}

/**
 * From RequestHandlingServiceIntegrationSpec 'add transcript with UTR'
 */
test('Add Transcript with UTR', async () => {
  // add transcript
  // // verify transcript
  // 1. get features on sequence (should be none)
  const getFeaturesCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': TEST_PASS,
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
      'location': {'fmin': 1216824, 'fmax': 1235616, 'strand': 1},
      'type': {'cv': {'name': 'sequence'}, 'name': 'mRNA'},
      'name': 'GB40856-RA',
      'children': [
        {
          'location': {'fmin': 1216824, 'fmax': 1216850, 'strand': 1},
          'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
        },
        {
          'location': {'fmin': 1216824, 'fmax': 1235534, 'strand': 1},
          'type': {'cv': {'name': 'sequence'}, 'name': 'CDS'}
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
  expect(returnFeature.location?.fmin).toEqual(1216824)
  expect(returnFeature.location?.fmax).toEqual(1235616)
  expect(returnFeature.children?.length).toEqual(6)


  // 3. get features on sequence (should be this one)
  const annotationsFoundResponse1 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound1 = new GenomeAnnotationGroup(annotationsFoundResponse1)
  expect(genomeAnnotationFound1.features.length).toEqual(1)
  const addedFeature1 = genomeAnnotationFound1.features[0]
  expect(addedFeature1.location?.fmin).toEqual(1216824)
  expect(addedFeature1.location?.fmax).toEqual(1235616)
  expect(addedFeature1.children?.length).toEqual(6)
  expect(addedFeature1.uniquename).toBeDefined()
  const uniqueNameToDelete = addedFeature1.uniquename


  // 4. delete feature
  const deleteFeatureCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'features': [{'uniquename': uniqueNameToDelete}]
  }
  const deleteFeatureResponse = await annotationEditorCommand(deleteFeatureCommand, 'deleteFeature')

  // 5. get features on sequence (should be none)
  const annotationsFoundResponse2 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound2 = new GenomeAnnotationGroup(annotationsFoundResponse2)
  expect(genomeAnnotationFound2.features.length).toEqual(0)

}, 10000)

/**
 * From CDS Service Integration Spec
 */
test('adding a gene model, a stop codon readthrough and getting its modified sequence', async () => {
  const transcriptObject = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'sequence': 'Group1.10',
    'features': [{
      'location': {'fmin': 734606, 'strand': 1, 'fmax': 735570},
      'name': 'GB40828-RA',
      'children': [
        // {
        //   'location': {'fmin': 734606, 'strand': 1, 'fmax': 734733},
        //   'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
        // },
        {
          'location': {'fmin': 734606, 'strand': 1, 'fmax': 734766},
          'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
        },
        {
          'location': {'fmin': 735446, 'strand': 1, 'fmax': 735570},
          'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
        },
        {
          'location': {'fmin': 734930, 'strand': 1, 'fmax': 735014},
          'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
        },
        {
          'location': {'fmin': 734733, 'strand': 1, 'fmax': 735446},
          'type': {'name': 'CDS', 'cv': {'name': 'sequence'}}
        },
        {
          'location': {'fmin': 735245, 'strand': 1, 'fmax': 735570},
          'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
        },
      ],
      'type': {'name': 'mRNA', 'cv': {'name': 'sequence'}}
    }],
  }
  const returnObject = await addTranscript(transcriptObject)
  const returnGenomeAnnotationGroup = new GenomeAnnotationGroup(returnObject)
  expect(returnGenomeAnnotationGroup.features.length).toEqual(1)
  const returnFeature = returnGenomeAnnotationGroup.features[0]
  expect(returnFeature.location?.fmin).toEqual(734606)
  expect(returnFeature.location?.fmax).toEqual(735570)
  expect(returnFeature.location?.strand).toEqual(1)
  expect(returnFeature.type?.name).toEqual('mRNA')
  expect(returnFeature.name).toEqual('GB40828-RA-00001')
  // NOTE: there are only 3 exons here (and one CDS) as the 3 exons overlap with each other from the original test case
  // expect(returnFeature.children.length).toEqual(4)
  expect(returnFeature.children.length).toEqual(4)
  // expect(returnFeature.parents.length).toEqual(1)

  const getCDSSequenceReturnObjectInitial = await getSequenceForFeatures(TEST_ORGANISM,TEST_SEQUENCE,returnFeature.uniquename as string,'cds',TEST_USER,TEST_PASS) as any

  // then: "we should get the anticipated CDS sequence"
  expect(getCDSSequenceReturnObjectInitial).toBeDefined()
  const expectedCdsSequenceInitial = 'ATGGAATCTGCTATTGTTCATCTTGAACAAAGCGTGCAAAAGGCTGATGGAAAACTAGACATGATTGCATGGCAAATTGATGCTTTTGAAAAAGAATTTGAAGATCCTGGTAGTGAGATTTCTGTGCTTCGTCTATTACGGTCTGTTCATCAAGTCACAAAAGATTATCAGAACCTTCGGCAAGAAATATTGGAGGTTCAACAATTGCAAAAGCAACTTTCAGATTCCCTTAAAGCACAATTATCTCAAGTGCATGGACATTTTAACTTATTACGCAATAAAATAGTAGGACAAAATAAAAATCTACAATTAAAATAA'
  expect(getCDSSequenceReturnObjectInitial).toEqual(expectedCdsSequenceInitial)


  // const setReadThroughCommand = {}
  const setReadThroughCommand = <JSON><unknown>{
    username: TEST_USER,
    password: 'secret',
    organism: TEST_ORGANISM,
    features: [{
      'readthrough_stop_codon': true,
      'uniquename': returnFeature.uniquename
    }]

  }
  // "{ ${testCredentials} \"operation\":\"set_readthrough_stop_codon\",\"features\":[{\"readthrough_stop_codon\":true,\"uniquename\":\"@UNIQUENAME@\"}],\"track\":\"Group1.10\",\"clientToken\":\"1231232\"}"
  const stopCodonReadthroughObject = await annotationEditorCommand(setReadThroughCommand, 'setReadthroughStopCodon')
  expect(stopCodonReadthroughObject).not.toContain('Request failed')

  const getCDSSequenceReturnObject = await getSequenceForFeatures(TEST_ORGANISM,TEST_SEQUENCE,returnFeature.uniquename as string,'cds',TEST_USER,TEST_PASS) as any

  // then: "we should get the anticipated CDS sequence"
  expect(getCDSSequenceReturnObject).toBeDefined()
  const expectedCdsSequence = 'ATGGAATCTGCTATTGTTCATCTTGAACAAAGCGTGCAAAAGGCTGATGGAAAACTAGACATGATTGCATGGCAAATTGATGCTTTTGAAAAAGAATTTGAAGATCCTGGTAGTGAGATTTCTGTGCTTCGTCTATTACGGTCTGTTCATCAAGTCACAAAAGATTATCAGAACCTTCGGCAAGAAATATTGGAGGTTCAACAATTGCAAAAGCAACTTTCAGATTCCCTTAAAGCACAATTATCTCAAGTGCATGGACATTTTAACTTATTACGCAATAAAATAGTAGGACAAAATAAAAATCTACAATTAAAATAAGATTAA'
  expect(getCDSSequenceReturnObject).toEqual(expectedCdsSequence)


})


beforeAll(async () => {
  const result = await removeEmptyCommonDirectory()

  // 0. if user does not exist
  let user = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  if (!user) {
    const addedUser = await addUser(TEST_USER,TEST_PASS, 'Admin', 'User',ADMIN_USER,ADMIN_PASS, Role.ADMIN,) as User
    user = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  }

  // 3. if organism with directory exists
  let organism: Organism = await getOrganism(authCommand) as Organism

  // 4. add organism directory
  if (!organism || organism.commonName !== TEST_ORGANISM) {
    await addOrganismWithDirectory(
      `${APOLLO_DATA}/sequences/honeybee-Group1.10/`,
      TEST_ORGANISM,
      ADMIN_USER,
      ADMIN_PASS,
    )
    organism = await getOrganism(authCommand) as Organism
  }
})

afterAll(async () => {

  // TODO:
  let organism = await getOrganism(authCommand) as Organism

  if (organism && organism.commonName === TEST_ORGANISM) {
    const totalDeleted = await deleteOrganismFeatures(TEST_ORGANISM,ADMIN_USER,ADMIN_PASS)
    organism = await deleteOrganism(TEST_ORGANISM,ADMIN_USER,ADMIN_PASS) as Organism
  }
  let user = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  if (user && user.username === TEST_USER) {
    user = await deleteUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  }
  user = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  organism = await getOrganism(authCommand) as Organism
})

