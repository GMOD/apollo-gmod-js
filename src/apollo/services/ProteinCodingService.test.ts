
/**
 *  @jest-environment node
 */

import {addTranscript} from './ProteinCodingService'
import {
  addOrganismWithDirectory,
  deleteOrganism, deleteOrganismFeatures,
  getAllOrganisms,
  getOrganism,
  removeEmptyCommonDirectory
} from './OrganismService'
import {Organism} from '../domain/Organism'
import {addUser, deleteUser, getUser} from './UserService'
import {User} from '../domain/User'
import {Role} from '../domain/Role'
import {sleep} from '../functions/Timing'

const TEST_USER = 'test@test.com'
const TEST_ANIMAL = 'testAnimal'
const TEST_DATA = `${__dirname}/../../../test-data`

/**
 * From RequestHandlingServiceIntegrationSpec
 */
test('Add Transcript with UTR' , async() => {

  // add transcript
  // const inputJSON = { features:[{'location':{'fmin':734606,'strand':1,'fmax':735570},'name':'GB40828-RA','children':[{'location':{'fmin':734606,'strand':1,'fmax':734733},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':735446,'strand':1,'fmax':735570},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734606,'strand':1,'fmax':734766},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734930,'strand':1,'fmax':735014},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':735245,'strand':1,'fmax':735570},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734733,'strand':1,'fmax':735446},'type':{'name':'CDS','cv':{'name':'sequence'}}}],'type':{'name':'mRNA','cv':{'name':'sequence'}}}],'track':'Group1.10'}
  // const transcript = await addTranscript(inputJSON) as Array<ProteinCodingTranscript>
  const transcriptObject = <JSON><unknown>{ 'username':TEST_USER,'password':'secret','organism':TEST_ANIMAL,'track': 'Group1.10', 'features': [{'location':{'fmin':1216824,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'mRNA'},'name':'GB40856-RA','children':[{'location':{'fmin':1235534,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1216824,'fmax':1216850,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1224676,'fmax':1224823,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1228682,'fmax':1228825,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1235237,'fmax':1235396,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1235487,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1216824,'fmax':1235534,'strand':1},'type':{'cv':{'name':'sequence'},'name':'CDS'}}]}], 'operation': 'add_transcript' }
  const validatedTranscriptReturn = {'features':[{'location':{'fmin':1216824,'strand':1,'fmax':1235616},'parent_type':{'name':'gene','cv':{'name':'sequence'}},'name':'GB40856-RA','children':[{'location':{'fmin':1235237,'strand':1,'fmax':1235396},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'@TRANSCRIPT_NAME@','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1216824,'strand':1,'fmax':1216850},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'0992325F0DD2290AB58EA37ECF2DA2E7','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1235487,'strand':1,'fmax':1235616},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'1C091FE87A8133803A69887F38FBDC4C','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209542,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1224676,'strand':1,'fmax':1224823},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'6D2E15D6DA759C523B79B96795927CAF','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1228682,'strand':1,'fmax':1228825},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'99C2A027C87DBDBC5536503D5C38F21C','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1216824,'strand':1,'fmax':1235534},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'994B96C6594F5DB1B6C836E6E0EDE2A6','type':{'name':'CDS','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'}],'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'5A8C864885BC71606E120322CE0EC28C','type':{'name':'mRNA','cv':{'name':'sequence'}},'date_last_modified':1425583209602,'parent_id':'8B9E9AC4D0DB90464F26B2F77A1E09B4'}]}

  // // verify transcript
  console.log('input test')
  console.log(transcriptObject)
  const returnObject = await addTranscript(transcriptObject)
  console.log('output test')
  console.log(returnObject)
  // expect(returnObject).toEqual(validatedTranscriptReturn)


  // const returnedCodingArray = getCodingArray(returnObject)
  // const validCodingArray = getCodingArray(validatedTranscriptReturn)
  // expect(returnedCodingArray.length).toEqual(validCodingArray.length)
  //
  // console.log('returned coding array')
  // console.log(returnedCodingArray)
  // console.log('validated coding array')
  // console.log(validCodingArray)
  // parse JSON to get CDS uniquename

  // set readThrough stop codon server

  // get sequence


})

function getCodingArray(jsonObject:any):any{
  const mrnaArray = jsonObject.features
  // assert mrnaArray.length === 1
  // assert 1 == mrnaArray.size()
  return mrnaArray[0].children
}

// beforeEach( async () => {
// beforeEach( async () => {
// })
//
// afterEach( async () => {
// })

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
      `${TEST_DATA}/sequences/honeybee-Group1.10/`,
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

