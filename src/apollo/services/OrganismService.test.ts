
/**
 *  @jest-environment node
 */

// import {addOrganism, deleteOrganism, getOrganism, findAllOrganisms} from './OrganismService'
import {deleteOrganism,addOrganismWithDirectory,findAllOrganisms} from './OrganismService'
import {Organism} from '../domain/Organism'
import fse from 'fs-extra'

const TEST_DATA = `${__dirname}/../../../test-data`
const APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`

beforeAll( async () => {
  await fse.removeSync(APOLLO_DATA)
  await fse.ensureDirSync(APOLLO_DATA)
  await fse.copySync(TEST_DATA,APOLLO_DATA)
})

afterAll( async () => {
  await fse.removeSync(APOLLO_DATA)
})

beforeEach( async () => {
  const allOrganisms = await findAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  const finalOrganisms = await findAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})

afterEach( async () => {
  const allOrganisms = await findAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  const finalOrganisms = await findAllOrganisms() as Array<Organism>
  expect(finalOrganisms.length).toEqual(0)
})


test('Copy directories over', async () => {
  expect(fse.pathExistsSync(APOLLO_DATA)).toBeTruthy()
  const inputFiles = await fse.readdir(APOLLO_DATA)
  const outputFiles = await fse.readdir(TEST_DATA)
  expect(inputFiles.length).toEqual(outputFiles.length)
  expect(inputFiles).toContain('mrna-top.gff')
  expect(inputFiles).toContain('yeastI')
  expect(outputFiles.length).toBeGreaterThan(10)
  expect(outputFiles.length).toBeLessThan(30)
})

test('Load Organisms', async () => {
  const initOrganisms = await findAllOrganisms() as Array<Organism>
  expect(typeof initOrganisms).not.toEqual('string')
  expect(initOrganisms.length).toEqual(0)
  const inputDirectory = `${APOLLO_DATA}/dataset_1_files/data/`
  await addOrganismWithDirectory(
    inputDirectory,'myorg'
  )
  const addedOrganismResult = await findAllOrganisms() as Array<Organism>
  expect(addedOrganismResult.length).toEqual(1)
  const addedOrganism = addedOrganismResult[0] as Organism
  // console.log('added organism',addedOrganism)
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(inputDirectory)
  expect(typeof addedOrganism).not.toEqual('string')
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.directory).toEqual(`${APOLLO_DATA}/dataset_1_files/data/`)
})

// test('Get Organism', async () => {
//   const organism = await getOrganism('admin@local.host') as Organism
//   expect(typeof organism).not.toEqual('string')
//   expect(organism.firstName).toEqual('Admin')
//   expect(organism.lastName).toEqual('Organism')
//   expect(organism.organismname).toEqual('admin@local.host')
//
// })
//
// test('Delete Organism', async () => {
//   const resultA = await addOrganism('trash2@bx.psu.edu','Poutrelle','Lapinou') as Organism
//   expect(resultA.organismname).toEqual('trash2@bx.psu.edu')
//   let organisms = await findAllOrganisms() as Array<Organism>
//   console.log('organisms 1: ',organisms)
//   const resultB = await getOrganism('trash2@bx.psu.edu') as Organism
//   expect(resultB.organismname).toEqual('trash2@bx.psu.edu')
//   const resultC = await deleteOrganism('trash2@bx.psu.edu') as Organism
//   expect(resultC.organismname).toEqual('trash2@bx.psu.edu')
//   organisms = await findAllOrganisms() as Array<Organism>
//   console.log('organisms 2: ',organisms)
//   let resultD = await getOrganism('trash2@bx.psu.edu')
//   resultD = await getOrganism('trash2@bx.psu.edu')
//   expect(resultD.toString()).toContain('404')
//
// })

