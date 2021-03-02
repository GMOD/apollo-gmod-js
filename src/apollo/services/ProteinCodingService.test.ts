
/**
 *  @jest-environment node
 */

import {addTranscript} from './ProteinCodingService'
import {ProteinCodingTranscript} from '../domain/ProteinCodingTranscript'
import {deleteOrganism, getAllOrganisms, removeEmptyCommonDirectory} from './OrganismService'
import {Organism} from '../domain/Organism'
import {promisify} from 'util'
import assert from 'assert'
export const sleep = promisify(setTimeout)


/**
 * From RequestHandlingServiceIntegrationSpec
 */
test('Add Transcript with UTR' , async() => {

  // add transcript
  // const inputJSON = { features:[{'location':{'fmin':734606,'strand':1,'fmax':735570},'name':'GB40828-RA','children':[{'location':{'fmin':734606,'strand':1,'fmax':734733},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':735446,'strand':1,'fmax':735570},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734606,'strand':1,'fmax':734766},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734930,'strand':1,'fmax':735014},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':735245,'strand':1,'fmax':735570},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734733,'strand':1,'fmax':735446},'type':{'name':'CDS','cv':{'name':'sequence'}}}],'type':{'name':'mRNA','cv':{'name':'sequence'}}}],'track':'Group1.10'}
  // const transcript = await addTranscript(inputJSON) as Array<ProteinCodingTranscript>
  const transcriptObject = <JSON><unknown>{ 'track': 'Group1.10', 'features': [{'location':{'fmin':1216824,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'mRNA'},'name':'GB40856-RA','children':[{'location':{'fmin':1235534,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1216824,'fmax':1216850,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1224676,'fmax':1224823,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1228682,'fmax':1228825,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1235237,'fmax':1235396,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1235487,'fmax':1235616,'strand':1},'type':{'cv':{'name':'sequence'},'name':'exon'}},{'location':{'fmin':1216824,'fmax':1235534,'strand':1},'type':{'cv':{'name':'sequence'},'name':'CDS'}}]}], 'operation': 'add_transcript' }
  const validatedTranscriptReturn = {'features':[{'location':{'fmin':1216824,'strand':1,'fmax':1235616},'parent_type':{'name':'gene','cv':{'name':'sequence'}},'name':'GB40856-RA','children':[{'location':{'fmin':1235237,'strand':1,'fmax':1235396},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'@TRANSCRIPT_NAME@','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1216824,'strand':1,'fmax':1216850},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'0992325F0DD2290AB58EA37ECF2DA2E7','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1235487,'strand':1,'fmax':1235616},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'1C091FE87A8133803A69887F38FBDC4C','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209542,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1224676,'strand':1,'fmax':1224823},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'6D2E15D6DA759C523B79B96795927CAF','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1228682,'strand':1,'fmax':1228825},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'99C2A027C87DBDBC5536503D5C38F21C','type':{'name':'exon','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'},{'location':{'fmin':1216824,'strand':1,'fmax':1235534},'parent_type':{'name':'mRNA','cv':{'name':'sequence'}},'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'994B96C6594F5DB1B6C836E6E0EDE2A6','type':{'name':'CDS','cv':{'name':'sequence'}},'date_last_modified':1425583209540,'parent_id':'5A8C864885BC71606E120322CE0EC28C'}],'properties':[{'value':'demo','type':{'name':'owner','cv':{'name':'feature_property'}}}],'uniquename':'5A8C864885BC71606E120322CE0EC28C','type':{'name':'mRNA','cv':{'name':'sequence'}},'date_last_modified':1425583209602,'parent_id':'8B9E9AC4D0DB90464F26B2F77A1E09B4'}]}

  //
  // // verify transcript
  // console.log(transcript)
  console.log('A')
  const returnObject = await addTranscript(transcriptObject)
  console.log('B')
  console.log(returnObject)
  expect(true)


  const returnedCodingArray = getCodingArray(returnObject)
  const validCodingArray = getCodingArray(validatedTranscriptReturn)
  expect(returnedCodingArray.length === validCodingArray.length)

  console.log('returned coding array')
  console.log(returnedCodingArray)
  console.log('validated coding array')
  console.log(validCodingArray)
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

beforeEach( async () => {
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  // await sleep(1000)
  const finalOrganisms = await getAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})

afterEach( async () => {
  // jest.setTimeout(10000)
  // await sleep(1000)
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  await sleep(1000)
  const finalOrganisms = await getAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})

beforeAll(async () => {
  const result = await removeEmptyCommonDirectory()
  console.log(result)

  // 0. if user does not exist
  // let user:User  = getUser('test@test.com')
  // // 1. add User
  // if(!user){
  //   addUser(
  //     'test@test.com',
  //     'Bob',
  //     'Test',
  //     'Admin'
  //   )
  //   user  = getUser('test@test.com')
  // }
  // expect(user).not.toBeNull()
  //
  // // 3. if organism with directory exists
  // let organism:Organism = getOrganism('sampleAnimal')
  //
  // // 4. add organism directory
  // if(!organism){
  //   addOrganism(
  //     'src/integration-test/groovy/resources/sequences/honeybee-Group1.10/',
  //     'sampleAnimal'
  //   )
  //   organism = getOrganism('sampleAnimal')
  // }
  // expect(organism).not.toBeNull()
  //
  // return true
})

afterAll(async  () => {

  // deleteUser('test@test.com')
  // deleteOrganism('sampleAnimal')
  //
  // user = getUser('test@test.com')
  // organism = getOrganism('sampleAnimal')
  //
  // expect(user).toBeNull()
  // expect(organism).toBeNull()
  //
  return true
})

