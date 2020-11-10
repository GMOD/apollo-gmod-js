import {getServerInfo, updateCommonPath} from './AnnotatorService'
import {promisify} from 'util'

beforeEach( async () => {
  await updateCommonPath('apollo_data')
})

afterEach( async () => {
  await updateCommonPath('apollo_data')
  // await sleep(1000)
})

test('Validate the default common path', async () => {
  const commonPath:any = await getServerInfo()
  expect(commonPath.relativePath).toEqual('apollo_data')
  expect(commonPath.directory).toEqual(true)
  expect(commonPath.writable).toEqual(true)
  const root = commonPath.root

  expect(commonPath.absolutePath).toEqual(root+'/'+commonPath.relativePath)

})

test('Update the default common path', async () => {
  const commonPath:any = await getServerInfo()
  expect(commonPath.relativePath).toEqual('apollo_data')
  expect(commonPath.directory).toEqual(true)
  expect(commonPath.writable).toEqual(true)
  const root = commonPath.root
  expect(commonPath.absolutePath).toEqual(root+'/'+commonPath.relativePath)

  const updatedCommonPath:any = await updateCommonPath('abc123')
  expect(updatedCommonPath.relativePath).toEqual('abc123')
  expect(updatedCommonPath.directory).toEqual(true)
  expect(updatedCommonPath.writable).toEqual(true)


  const revertCommonPath:any = await updateCommonPath('apollo_data')
  expect(revertCommonPath.relativePath).toEqual('apollo_data')

})
