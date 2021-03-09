

import {addTranscript, annotationEditorCommand} from './ProteinCodingService'
import {
  addOrganismWithDirectory,
  deleteOrganism, deleteOrganismFeatures,
  getOrganism,
  removeEmptyCommonDirectory
} from './OrganismService'
import {Organism} from '../domain/Organism'
import {addUser, deleteUser, getUser} from './UserService'
import {User} from '../domain/User'
import {Role} from '../domain/Role'
import {sleep} from '../functions/Timing'
import {Feature} from '../domain/Feature'
import {GenomeAnnotationGroup} from '../domain/GenomeAnnotationGroup'

const TEST_USER = 'test@test.com'
const TEST_ANIMAL = 'testAnimal'
const LOCAL_APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`
const APOLLO_DATA = process.env.DOCKER_CI ? '/data' : LOCAL_APOLLO_DATA

/**
 * From RequestHandlingServiceIntegrationSpec 'add transcript with UTR'
 */
test('Add Transcript with UTR' , async() => {
  // add transcript

  // // verify transcript
  // 1. get features on sequence (should be none)
  const getFeaturesCommand = <JSON><unknown>{ 'username':TEST_USER,'password':'secret','organism':TEST_ANIMAL,'sequence': 'Group1.10' }
  const annotationsFoundResponse0 = await annotationEditorCommand(getFeaturesCommand,'getFeatures')
  console.log('annotations found response 0',JSON.stringify(annotationsFoundResponse0))
  const genomeAnnotationFound0 = new GenomeAnnotationGroup(annotationsFoundResponse0)
  console.log('annotations found 0',genomeAnnotationFound0)
  expect(genomeAnnotationFound0.features.length).toEqual(0)


  // 2. add transcript
  const addTranscriptCommand = <JSON><unknown>{ 'username':TEST_USER,'password':'secret','organism':TEST_ANIMAL,'sequence': 'Group1.10', 'features': [{'location':{'fmin':1216824,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'mRNA'},'name':'GB40856-RA','children':[{'location':{'fmin':1235534,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1216824,'fmax':1216850,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1224676,'fmax':1224823,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1228682,'fmax':1228825,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1235237,'fmax':1235396,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1235487,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1216824,'fmax':1235534,'strand':1},'type':{'cv':{'name':'sequence'},'name':'CDS'}}]}] }
  console.log('input test')
  console.log(JSON.stringify( addTranscriptCommand))
  const validatedTranscriptReturn = {'features':[{'location':{'fmin':1216824,'strand':1,'fmax':1235616},'parent_type':{'name':'gene','cv':{'name':'sequence'}},'name':'GB40856-RA','children':[{'location':{'fmin':1235237,'strand':1,'fmax':1235396},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'@TRANSCRIPT_NAME@','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1216824,'strand':1,'fmax':1216850},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'0992325F0DD2290AB58EA37ECF2DA2E7','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1235487,'strand':1,'fmax':1235616},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'1C091FE87A8133803A69887F38FBDC4C','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209542,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1224676,'strand':1,'fmax':1224823},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'6D2E15D6DA759C523B79B96795927CAF','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1228682,'strand':1,'fmax':1228825},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'99C2A027C87DBDBC5536503D5C38F21C','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1216824,'strand':1,'fmax':1235534},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'994B96C6594F5DB1B6C836E6E0EDE2A6','type':{'name':'CDS','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'}],'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniqueName':'5A8C864885BC71606E120322CE0EC28C','type':{'name':'mRNA','cv':{'name':'sequence'}},'date_last_modified':1425583209602,'parent_id':'8B9E9AC4D0DB90464F26B2F77A1E09B4'}]}
  const returnObject = await addTranscript( addTranscriptCommand)
  console.log('output test')
  console.log(JSON.stringify(returnObject))
  const returnGenomeAnnotationGroup = new GenomeAnnotationGroup(returnObject)
  expect(returnGenomeAnnotationGroup.features.length).toEqual(1)
  const returnFeature = returnGenomeAnnotationGroup.features[0]
  expect(returnFeature.name).toEqual('GB40856-RA-00001')
  const validationGenomeAnnotationGroup = new GenomeAnnotationGroup(validatedTranscriptReturn)
  expect(validationGenomeAnnotationGroup.features.length).toEqual(1)
  const validationFeature = returnGenomeAnnotationGroup.features[0]
  expect(returnFeature.location?.fmin).toEqual(validationFeature.location?.fmin)
  expect(returnFeature.location?.fmax).toEqual(validationFeature.location?.fmax)
  expect(returnFeature.children?.length).toEqual(validationFeature.children?.length)


  // console.log('return Feature',JSON.stringify(returnFeature))
  // console.log('validation Feature',JSON.stringify(validationFeature))


  // 3. get features on sequence (should be this one)
  const annotationsFoundResponse1 = await annotationEditorCommand(getFeaturesCommand,'getFeatures')
  console.log('annotations found response 1',JSON.stringify(annotationsFoundResponse1 ))
  const genomeAnnotationFound1 = new GenomeAnnotationGroup(annotationsFoundResponse1)
  console.log('annotations found 1',genomeAnnotationFound1)
  expect(genomeAnnotationFound1.features.length).toEqual(1)
  const addedFeature1 = genomeAnnotationFound1.features[0]
  expect(addedFeature1.location?.fmin).toEqual(validationFeature.location?.fmin)
  expect(addedFeature1.location?.fmax).toEqual(validationFeature.location?.fmax)
  // expect(addedFeature1.children?.length).toEqual(validationFeature.children?.length)
  expect(addedFeature1.uniqueName).toBeDefined()
  const uniqueNameToDelete = addedFeature1.uniqueName


  // 4. delete feature
  const deleteFeatureCommand = <JSON><unknown>{ 'username':TEST_USER,'password':'secret','organism':TEST_ANIMAL,'features': [{'uniqueName':uniqueNameToDelete}] }
  const deleteFeatureResponse = await annotationEditorCommand(deleteFeatureCommand,'deleteFeature')
  console.log('delete features response',deleteFeatureResponse)




  // 5. get features on sequence (should be none)
  const annotationsFoundResponse2 = await annotationEditorCommand(getFeaturesCommand,'getFeatures')
  console.log('annotations found response 2',JSON.stringify(annotationsFoundResponse2))
  const genomeAnnotationFound2 = new GenomeAnnotationGroup(annotationsFoundResponse2)
  console.log('annotations found 2',genomeAnnotationFound2)
  expect(genomeAnnotationFound0.features.length).toEqual(0)

})

beforeAll(async () => {
  const result = await removeEmptyCommonDirectory()
  console.log(result)


  // 0. if user does not exist
  let user = await getUser(TEST_USER) as User
  console.log('user 0',user)
  // console.log('user 1',user.toString().indexOf('fail')>0)
  if(!user){
    console.log('ADDING user')
    const addedUser = await addUser(TEST_USER, 'Admin', 'User', Role.ADMIN,) as User
    console.log('added user',addedUser)
    sleep(1000)
    user  = await getUser(TEST_USER) as User
    console.log('user 2',user)
  }
  // console.log('user',user)
  // expect(user).toBeDefined()
  // expect(user.username).toEqual(TEST_USER)
  //
  // 3. if organism with directory exists
  let organism:Organism = await getOrganism(TEST_ANIMAL) as Organism

  console.log('organism',organism)
  // 4. add organism directory
  if(!organism || organism.commonName !==TEST_ANIMAL){
    console.log('add organism')
    await addOrganismWithDirectory(
      `${APOLLO_DATA}/sequences/honeybee-Group1.10/`,
      TEST_ANIMAL
    )
    organism = await getOrganism(TEST_ANIMAL) as Organism
  }
  // console.log('organism',organism)
  // expect(organism).toBeDefined()
  // expect(organism.commonName).toEqual(TEST_ANIMAL)
})

afterAll(async  () => {

  // TODO:
  let organism = await getOrganism(TEST_ANIMAL) as Organism

  if(organism && organism.commonName===TEST_ANIMAL){
    const totalDeleted = await deleteOrganismFeatures(TEST_ANIMAL)
    console.log('deleted',totalDeleted)
    organism = await deleteOrganism(TEST_ANIMAL) as Organism
    console.log('deleted org',organism)
  }
  let user = await getUser(TEST_USER) as User
  if(user && user.username===TEST_USER){
    user = await deleteUser(TEST_USER) as User
    console.log('deleted user',user)
  }

  // sleep(3000)

  user = await getUser(TEST_USER) as User
  organism = await getOrganism(TEST_ANIMAL) as Organism

  console.log('output user',user)
  console.log('output organism',organism)

  // expect(user).toBeUndefined()
  // expect(organism).toBeUndefined()
})

