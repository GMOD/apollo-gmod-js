
/**
 *  @jest-environment node
 */

import {addTranscript} from './ProteinCodingService'
import {ProteinCodingTranscript} from '../domain/ProteinCodingTranscript'
import {deleteOrganism, getAllOrganisms} from './OrganismService'
import {Organism} from '../domain/Organism'
import {promisify} from 'util'
export const sleep = promisify(setTimeout)


test('Add Transcript with UTR' , () => {

  // add transcript
  const inputJSON = { features:[{'location':{'fmin':734606,'strand':1,'fmax':735570},'name':'GB40828-RA','children':[{'location':{'fmin':734606,'strand':1,'fmax':734733},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':735446,'strand':1,'fmax':735570},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734606,'strand':1,'fmax':734766},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734930,'strand':1,'fmax':735014},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':735245,'strand':1,'fmax':735570},'type':{'name':'exon','cv':{'name':'sequence'}}},{'location':{'fmin':734733,'strand':1,'fmax':735446},'type':{'name':'CDS','cv':{'name':'sequence'}}}],'type':{'name':'mRNA','cv':{'name':'sequence'}}}],'track':'Group1.10'}
  // const transcript = await addTranscript(inputJSON) as Array<ProteinCodingTranscript>
  //
  // // verify transcript
  // console.log(transcript)
  expect(true)

  // parse JSON to get CDS uniquename

  // set readThrough stop codon server

  // get sequence


})

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

beforeAll(() => {

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

afterAll(() => {

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

