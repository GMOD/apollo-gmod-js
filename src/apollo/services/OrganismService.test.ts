
/**
 *  @jest-environment node
 */

// import {addOrganism, deleteOrganism, getOrganism, getAllOrganisms} from './OrganismService'
import {deleteOrganism, addOrganismWithDirectory, getAllOrganisms, getOrganism} from './OrganismService'
import {Organism} from '../domain/Organism'
import fse from 'fs-extra'

const TEST_DATA = `${__dirname}/../../../test-data`
const APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`

beforeAll( async () => {
  fse.removeSync(APOLLO_DATA)
  fse.ensureDirSync(APOLLO_DATA)
  fse.copySync(TEST_DATA,APOLLO_DATA)
})

afterAll( async () => {
  fse.removeSync(APOLLO_DATA)
})

beforeEach( async () => {
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  const finalOrganisms = await getAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})

afterEach( async () => {
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  const finalOrganisms = await getAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})


test('Copy directories over', async () => {
  expect(fse.pathExistsSync(APOLLO_DATA)).toBeTruthy()
  const inputFiles = fse.readdirSync(APOLLO_DATA)
  const outputFiles = fse.readdirSync(TEST_DATA)
  expect(inputFiles.length).toEqual(outputFiles.length)
  expect(inputFiles).toContain('mrna-top.gff')
  expect(inputFiles).toContain('yeastI')
  expect(outputFiles.length).toBeGreaterThan(10)
  expect(outputFiles.length).toBeLessThan(30)
})

test('Find All Organisms', async () => {
  expect(fse.pathExistsSync(APOLLO_DATA)).toBeTruthy()
  const initOrganisms = await getAllOrganisms() as Array<Organism>
  expect(typeof initOrganisms).not.toEqual('string')
  expect(initOrganisms.length).toEqual(0)
  const INPUT_DIRECTORY = `${APOLLO_DATA}/dataset_1_files/data/`
  const inputFiles = fse.readdirSync(INPUT_DIRECTORY)
  expect(inputFiles.length).toBeGreaterThan(5)
  expect(inputFiles.length).toBeLessThan(10)
  expect(inputFiles).toContain('trackList.json')
  expect(fse.pathExistsSync(INPUT_DIRECTORY)).toBeTruthy()
  console.log('input files',inputFiles)
  const result = await addOrganismWithDirectory(
    INPUT_DIRECTORY,'myorg'
  )
  const addedOrganismResult = await getAllOrganisms() as Array<Organism>
  console.log('all results',addedOrganismResult,result)
  // expect(result).toEqual(1)
  expect(addedOrganismResult.length).toEqual(1)
  const addedOrganism = addedOrganismResult[0] as Organism
  // console.log('added organism',addedOrganism)
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(INPUT_DIRECTORY)
  expect(typeof addedOrganism).not.toEqual('string')
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.directory).toEqual(`${APOLLO_DATA}/dataset_1_files/data/`)
})

test('Get One Organisms', async () => {
  const initOrganisms = await getAllOrganisms() as Array<Organism>
  expect(typeof initOrganisms).not.toEqual('string')
  expect(initOrganisms.length).toEqual(0)
  const inputDirectory = `${APOLLO_DATA}/dataset_1_files/data/`
  await addOrganismWithDirectory(
    inputDirectory,'myorg'
  )
  const addedOrganism = await getOrganism('myorg') as Organism
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(inputDirectory)
  expect(typeof addedOrganism).not.toEqual('string')
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.directory).toEqual(`${APOLLO_DATA}/dataset_1_files/data/`)
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

