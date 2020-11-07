
/**
 *  @jest-environment node
 */

// import {addOrganism, deleteOrganism, getOrganism, getAllOrganisms} from './OrganismService'
import {deleteOrganism, addOrganismWithDirectory, getAllOrganisms, getOrganism} from './OrganismService'
import {Organism} from '../domain/Organism'
import fse from 'fs-extra'
import { promisify } from 'util'
const sleep = promisify(setTimeout)

const TEST_DATA = `${__dirname}/../../../test-data`
const LOCAL_APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`
const APOLLO_DATA = '/data'
const LOCAL_INPUT_DIRECTORY = `${LOCAL_APOLLO_DATA}/dataset_1_files/data/`
const APOLLO_INPUT_DIRECTORY = `${APOLLO_DATA}/dataset_1_files/data/`



beforeAll( async () => {
  // fse.removeSync(LOCAL_APOLLO_DATA)
  // fse.ensureDirSync(LOCAL_APOLLO_DATA)
  // fse.copySync(TEST_DATA,LOCAL_APOLLO_DATA)
})

afterAll( async () => {
  // fse.removeSync(LOCAL_APOLLO_DATA)
})

beforeEach( async () => {
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  await sleep(1000)
  const finalOrganisms = await getAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})

afterEach( async () => {
  jest.setTimeout(10000)
  await sleep(1000)
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  await sleep(1000)
  const finalOrganisms = await getAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})


test('Copy directories over', async () => {
  expect(fse.pathExistsSync(LOCAL_APOLLO_DATA)).toBeTruthy()
  const inputFiles = fse.readdirSync(LOCAL_APOLLO_DATA)
  const outputFiles = fse.readdirSync(TEST_DATA)
  // expect(inputFiles.length).toEqual(outputFiles.length)
  expect(inputFiles).toContain('mrna-top.gff')
  expect(inputFiles).toContain('yeastI')
  expect(outputFiles.length).toBeGreaterThan(10)
  expect(outputFiles.length).toBeLessThan(30)
})

test('Find All Organisms', async () => {
  expect(fse.pathExistsSync(LOCAL_APOLLO_DATA)).toBeTruthy()
  const initOrganisms = await getAllOrganisms() as Array<Organism>
  expect(typeof initOrganisms).not.toEqual('string')
  expect(initOrganisms.length).toEqual(0)
  const inputFiles = fse.readdirSync(LOCAL_INPUT_DIRECTORY)
  expect(inputFiles.length).toBeGreaterThan(5)
  expect(inputFiles.length).toBeLessThan(10)
  expect(inputFiles).toContain('trackList.json')
  expect(fse.pathExistsSync(LOCAL_INPUT_DIRECTORY)).toBeTruthy()
  const result = await addOrganismWithDirectory(
    APOLLO_INPUT_DIRECTORY,'myorg'
  )
  console.log('result',result)
  await sleep(1000)
  const addedOrganismResult = await getAllOrganisms() as Array<Organism>
  expect(typeof addedOrganismResult).not.toEqual('string')
  expect(addedOrganismResult.length).toEqual(1)
  const addedOrganism = addedOrganismResult[0] as Organism
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(APOLLO_INPUT_DIRECTORY)
  expect(addedOrganism.commonName).toEqual('myorg')
},20000)

test('Get One Organisms', async () => {
  expect(fse.pathExistsSync(LOCAL_APOLLO_DATA)).toBeTruthy()
  const initOrganisms = await getAllOrganisms() as Array<Organism>
  expect(typeof initOrganisms).not.toEqual('string')
  expect(initOrganisms.length).toEqual(0)
  const inputFiles = fse.readdirSync(LOCAL_INPUT_DIRECTORY)
  expect(inputFiles.length).toBeGreaterThan(5)
  expect(inputFiles.length).toBeLessThan(10)
  expect(inputFiles).toContain('trackList.json')
  expect(fse.pathExistsSync(LOCAL_INPUT_DIRECTORY)).toBeTruthy()
  const result = await addOrganismWithDirectory(
    APOLLO_INPUT_DIRECTORY,'myorg'
  )
  console.log('result',result)
  await sleep(1000)
  const addedOrganism = await getOrganism('myorg') as Organism
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(APOLLO_INPUT_DIRECTORY)
  expect(addedOrganism.commonName).toEqual('myorg')
})

// test('Add Organism With Sequence', async () => {
//   const resultA = await addOrganism('trash2@bx.psu.edu','Poutrelle','Lapinou') as Organism
//   expect(resultA.organismname).toEqual('trash2@bx.psu.edu')
//   let organisms = await getAllOrganisms() as Array<Organism>
//   console.log('organisms 1: ',organisms)
//   const resultB = await getOrganism('trash2@bx.psu.edu') as Organism
//   expect(resultB.organismname).toEqual('trash2@bx.psu.edu')
//   const resultC = await deleteOrganism('trash2@bx.psu.edu') as Organism
//   expect(resultC.organismname).toEqual('trash2@bx.psu.edu')
//   organisms = await getAllOrganisms() as Array<Organism>
//   console.log('organisms 2: ',organisms)
//   let resultD = await getOrganism('trash2@bx.psu.edu')
//   resultD = await getOrganism('trash2@bx.psu.edu')
//   expect(resultD.toString()).toContain('404')
//
// })

