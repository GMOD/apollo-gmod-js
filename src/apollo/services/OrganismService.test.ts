
/**
 *  @jest-environment node
 */

// import {addOrganism, deleteOrganism, getOrganism, findAllOrganisms} from './OrganismService'
import {deleteOrganism,addOrganismWithDirectory,findAllOrganisms} from './OrganismService'
import {Organism} from '../domain/Organism'
// import fs from 'fs'
import fse from 'fs-extra'

const TEST_DATA = `${__dirname}/../../../test-data`
const APOLLO_DATA = `${__dirname}/../../../apollo-data`

beforeAll( () => {
  fse.remove(APOLLO_DATA)
  fse.copySync(TEST_DATA,APOLLO_DATA, {recursive: true})
})

afterAll( () => {
  fse.remove(APOLLO_DATA)
})

beforeEach( async () => {
  // await deleteOrganism('trash2@bx.psu.edu')
})

afterEach( async () => {
  // await deleteOrganism('trash2@bx.psu.edu')
})


test('Copy directories over', () => {
  fse.remove(APOLLO_DATA)
  fse.copySync(TEST_DATA,APOLLO_DATA, {recursive: true})

})

test('Load Organisms', async () => {
  const organisms = await findAllOrganisms() as Array<Organism>
  expect(typeof organisms).not.toEqual('string')
  // expect(organisms.length).toEqual(0)
  // const addedOrganismResult = await addOrganismWithDirectory(
  //   `${APOLLO_DATA}/dataset_1_files/data/`,'myorg'
  // )
  // expect(addedOrganismResult.length).toEqual(1)
  // const addedOrganism = addedOrganismResult[0] as Organism
  // console.log('addedOrganism',addedOrganism)
  // expect(typeof addedOrganism).not.toEqual('string')
  // expect(addedOrganism.commonName).toEqual('myorg')
  // expect(addedOrganism.directory).toEqual(`${APOLLO_DATA}/dataset_1_files/data/`)

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

