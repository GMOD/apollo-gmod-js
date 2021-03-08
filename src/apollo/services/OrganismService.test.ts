
/**
 *  @jest-environment node
 */

// import {addOrganism, deleteOrganism, getOrganism, getAllOrganisms} from './OrganismService'
import {
  deleteOrganism,
  addOrganismWithDirectory,
  getAllOrganisms,
  getOrganism,
  addOrganismWithSequence, getCommonDirectory, removeEmptyCommonDirectory
} from './OrganismService'
import {Organism} from '../domain/Organism'
import fse from 'fs-extra'
import {sleep} from '../functions/Timing'

const TEST_DATA = `${__dirname}/../../../test-data`
const LOCAL_APOLLO_DATA = `${__dirname}/../../../temp-apollo-test-data`
const APOLLO_DATA = process.env.DOCKER_CI ? '/data' : LOCAL_APOLLO_DATA
const LOCAL_INPUT_DIRECTORY = `${LOCAL_APOLLO_DATA}/dataset_1_files/data/`
const APOLLO_INPUT_DIRECTORY = `${APOLLO_DATA}/dataset_1_files/data/`
const LOCAL_SEQ_DIRECTORY= `${LOCAL_INPUT_DIRECTORY}/seq/genome.fasta`



beforeAll( async () => {
  const result = await removeEmptyCommonDirectory()
  console.log(result)
})

afterAll( async () => {
  // fse.removeSync(LOCAL_APOLLO_DATA)
  const result = await removeEmptyCommonDirectory()
  console.log(result)

})

beforeEach( async () => {
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
  await sleep(2000)
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
  await sleep(1000)
  const addedOrganismResult = await getAllOrganisms() as Array<Organism>
  expect(typeof addedOrganismResult).not.toEqual('string')
  expect(addedOrganismResult.length).toEqual(1)
  const addedOrganism = addedOrganismResult[0] as Organism
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(APOLLO_INPUT_DIRECTORY)
  expect(addedOrganism.commonName).toEqual('myorg')
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
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
  await sleep(1000)
  const addedOrganism = await getOrganism('myorg') as Organism
  expect(addedOrganism.commonName).toEqual('myorg')
  expect(addedOrganism.sequences).toEqual(1)
  expect(addedOrganism.directory).toEqual(APOLLO_INPUT_DIRECTORY)
  expect(addedOrganism.commonName).toEqual('myorg')
  const allOrganisms = await getAllOrganisms() as Array<Organism>
  for( const org of allOrganisms){
    await deleteOrganism(org.commonName)
  }
})

test('Add Organism With Sequence', async () => {

  const initOrganisms = await getAllOrganisms() as Array<Organism>
  expect(typeof initOrganisms).not.toEqual('string')
  expect(initOrganisms.length).toEqual(0)

  const result = await addOrganismWithSequence(LOCAL_SEQ_DIRECTORY,'myseqorg')
  expect(typeof result).not.toEqual('string')
  expect(JSON.stringify(result)).not.toContain('error')
  await sleep(1000)
  const addedOrganism = await getOrganism('myseqorg') as Organism
  expect(addedOrganism.commonName).toEqual('myseqorg')

  expect(addedOrganism.genomeFasta).toEqual('seq/myseqorg.fa')
  expect(addedOrganism.genomeFastaIndex).toEqual('seq/myseqorg.fa.fai')

  await sleep(1000)

  const allOrganisms = await getAllOrganisms() as Array<Organism>
  expect(typeof allOrganisms).not.toEqual('string')
  expect(allOrganisms.length).toEqual(1)

  await sleep(1000)
  await deleteOrganism(addedOrganism.commonName)

})

