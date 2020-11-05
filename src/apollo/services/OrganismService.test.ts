
/**
 *  @jest-environment node
 */

// import {addOrganism, deleteOrganism, getOrganism, findAllOrganisms} from './OrganismService'
import {deleteOrganism,addOrganismWithDirectory,findAllOrganisms} from './OrganismService'
import {Organism} from '../domain/Organism'

test('Load Organisms', async () => {
  const organisms = await findAllOrganisms() as Array<Organism>
  console.log('oirganisms',organisms)
  console.log(organisms)
  expect(typeof organisms).not.toEqual('string')
  expect(organisms.length).toEqual(0)
  // TODO: add a filter for 'admin@local.host
  // const organism:Organism =  organisms.filter( s => s.organismname == 'admin@local.host')[0]
  // expect(organism.firstName).toEqual('Admin')
  // expect(organism.lastName).toEqual('Organism')
  // expect(organism.inactive).toEqual(false)
  // expect(organism.role).toEqual('ADMIN')
  // expect(organism.organismname).toEqual('admin@local.host')

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

beforeEach( async () => {
  await deleteOrganism('trash2@bx.psu.edu')
})

afterEach( async () => {
  await deleteOrganism('trash2@bx.psu.edu')
})
