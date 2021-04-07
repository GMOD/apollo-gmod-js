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
 * From RequestHandlingServiceIntegrationSpec 'add transcript with UTR'
 */
test('Add Transcript with UTR', async () => {
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
      'location': {'fmin': 1216824, 'fmax': 1235616, 'strand': 1},
      'type': {'cv': {'name': 'sequence'}, 'name': 'mRNA'},
      'name': 'GB40856-RA',
      'children': [{
        'location': {'fmin': 1235534, 'fmax': 1235616, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 1216824, 'fmax': 1216850, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 1224676, 'fmax': 1224823, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 1228682, 'fmax': 1228825, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 1235237, 'fmax': 1235396, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 1235487, 'fmax': 1235616, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'exon'}
      }, {
        'location': {'fmin': 1216824, 'fmax': 1235534, 'strand': 1},
        'type': {'cv': {'name': 'sequence'}, 'name': 'CDS'}
      }]
    }]
  }
  const validatedTranscriptReturn = {
    'features': [{
      'location': {'fmin': 1216824, 'strand': 1, 'fmax': 1235616},
      'parent_type': {'name': 'gene', 'cv': {'name': 'sequence'}},
      'name': 'GB40856-RA',
      'children': [{
        'location': {'fmin': 1235237, 'strand': 1, 'fmax': 1235396},
        'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
        'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
        'uniqueName': '@TRANSCRIPT_NAME@',
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
        'date_last_modified': 1425583209540,
        'parent_id': '5A8C864885BC71606E120322CE0EC28C'
      }, {
        'location': {'fmin': 1216824, 'strand': 1, 'fmax': 1216850},
        'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
        'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
        'uniqueName': '0992325F0DD2290AB58EA37ECF2DA2E7',
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
        'date_last_modified': 1425583209540,
        'parent_id': '5A8C864885BC71606E120322CE0EC28C'
      }, {
        'location': {'fmin': 1235487, 'strand': 1, 'fmax': 1235616},
        'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
        'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
        'uniqueName': '1C091FE87A8133803A69887F38FBDC4C',
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
        'date_last_modified': 1425583209542,
        'parent_id': '5A8C864885BC71606E120322CE0EC28C'
      }, {
        'location': {'fmin': 1224676, 'strand': 1, 'fmax': 1224823},
        'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
        'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
        'uniqueName': '6D2E15D6DA759C523B79B96795927CAF',
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
        'date_last_modified': 1425583209540,
        'parent_id': '5A8C864885BC71606E120322CE0EC28C'
      }, {
        'location': {'fmin': 1228682, 'strand': 1, 'fmax': 1228825},
        'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
        'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
        'uniqueName': '99C2A027C87DBDBC5536503D5C38F21C',
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
        'date_last_modified': 1425583209540,
        'parent_id': '5A8C864885BC71606E120322CE0EC28C'
      }, {
        'location': {'fmin': 1216824, 'strand': 1, 'fmax': 1235534},
        'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
        'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
        'uniqueName': '994B96C6594F5DB1B6C836E6E0EDE2A6',
        'type': {'name': 'CDS', 'cv': {'name': 'sequence'}},
        'date_last_modified': 1425583209540,
        'parent_id': '5A8C864885BC71606E120322CE0EC28C'
      }],
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniqueName': '5A8C864885BC71606E120322CE0EC28C',
      'type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209602,
      'parent_id': '8B9E9AC4D0DB90464F26B2F77A1E09B4'
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
  const validationFeature = returnGenomeAnnotationGroup.features[0]
  expect(returnFeature.location?.fmin).toEqual(validationFeature.location?.fmin)
  expect(returnFeature.location?.fmax).toEqual(validationFeature.location?.fmax)
  expect(returnFeature.children?.length).toEqual(validationFeature.children?.length)


  // 3. get features on sequence (should be this one)
  const annotationsFoundResponse1 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound1 = new GenomeAnnotationGroup(annotationsFoundResponse1)
  expect(genomeAnnotationFound1.features.length).toEqual(1)
  const addedFeature1 = genomeAnnotationFound1.features[0]
  expect(addedFeature1.location?.fmin).toEqual(validationFeature.location?.fmin)
  expect(addedFeature1.location?.fmax).toEqual(validationFeature.location?.fmax)
  // expect(addedFeature1.children?.length).toEqual(validationFeature.children?.length)
  expect(addedFeature1.uniqueName).toBeDefined()
  const uniqueNameToDelete = addedFeature1.uniqueName


  // 4. delete feature
  const deleteFeatureCommand = <JSON><unknown>{
    'username': TEST_USER,
    'password': 'secret',
    'organism': TEST_ORGANISM,
    'features': [{'uniqueName': uniqueNameToDelete}]
  }
  const deleteFeatureResponse = await annotationEditorCommand(deleteFeatureCommand, 'deleteFeature')


  // 5. get features on sequence (should be none)
  const annotationsFoundResponse2 = await annotationEditorCommand(getFeaturesCommand, 'getFeatures')
  const genomeAnnotationFound2 = new GenomeAnnotationGroup(annotationsFoundResponse2)
  expect(genomeAnnotationFound0.features.length).toEqual(0)

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
      'children': [{
        'location': {'fmin': 734606, 'strand': 1, 'fmax': 734733},
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
      }, {
        'location': {'fmin': 735446, 'strand': 1, 'fmax': 735570},
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
      }, {
        'location': {'fmin': 734606, 'strand': 1, 'fmax': 734766},
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
      }, {
        'location': {'fmin': 734930, 'strand': 1, 'fmax': 735014},
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
      }, {
        'location': {'fmin': 735245, 'strand': 1, 'fmax': 735570},
        'type': {'name': 'exon', 'cv': {'name': 'sequence'}}
      }, {
        'location': {'fmin': 734733, 'strand': 1, 'fmax': 735446},
        'type': {'name': 'CDS', 'cv': {'name': 'sequence'}}
      }],
      'type': {'name': 'mRNA', 'cv': {'name': 'sequence'}}
    }],
  }
  const returnObject = await addTranscript(transcriptObject)
  console.log('return object', JSON.stringify(returnObject))
  const returnGenomeAnnotationGroup = new GenomeAnnotationGroup(returnObject)
  expect(returnGenomeAnnotationGroup.features.length).toEqual(1)
  // console.log('return features 2',returnGenomeAnnotationGroup.features[0].children)
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
  console.log('unique name', JSON.stringify(returnFeature))

  // const setReadThroughCommand = {}
  const setReadThroughCommand = <JSON><unknown>{
    username: TEST_USER,
    password: 'secret',
    organism: TEST_ORGANISM,
    features: [{
      'readthrough_stop_codon': true,
      'uniqueName': returnFeature.uniqueName
    }]

  }
  console.log('input command', JSON.stringify(setReadThroughCommand))
  // "{ ${testCredentials} \"operation\":\"set_readthrough_stop_codon\",\"features\":[{\"readthrough_stop_codon\":true,\"uniqueName\":\"@UNIQUENAME@\"}],\"track\":\"Group1.10\",\"clientToken\":\"1231232\"}"
  const stopCodonReadthroughObject = await annotationEditorCommand(setReadThroughCommand, 'setReadthroughStopCodon')
  console.log('stop codon readthrough object')
  console.log(JSON.stringify(stopCodonReadthroughObject))
  expect(stopCodonReadthroughObject).not.toContain('Request failed')

  // TODO
  // const getSequenceCommand = <JSON><unknown>{ 'features':[{'uniquename':returnFeature.uniqueName}],'type':'cds'}
  const getCDSSequenceReturnObject = await getSequenceForFeatures(TEST_ORGANISM,TEST_SEQUENCE,returnFeature.uniqueName as string,'cds') as any
  console.log('get sequence for features')
  console.log(JSON.stringify(getCDSSequenceReturnObject))
  
  // then: "we should get the anticipated CDS sequence"
  expect(getCDSSequenceReturnObject).toBeDefined()
  const expectedCdsSequence = 'ATGGAATCTGCTATTGTTCATCTTGAACAAAGCGTGCAAAAGGCTGATGGAAAACTAGACATGATTGCATGGCAAATTGATGCTTTTGAAAAAGAATTTGAAGATCCTGGTAGTGAGATTTCTGTGCTTCGTCTATTACGGTCTGTTCATCAAGTCACAAAAGATTATCAGAACCTTCGGCAAGAAATATTGGAGGTTCAACAATTGCAAAAGCAACTTTCAGATTCCCTTAAAGCACAATTATCTCAAGTGCATGGACATTTTAACTTATTACGCAATAAAATAGTAGGACAAAATAAAAATCTACAATTAAAATAAGATTAA'
  expect(getCDSSequenceReturnObject).toEqual(expectedCdsSequence)


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

