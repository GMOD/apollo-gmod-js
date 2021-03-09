/**
 *  @jest-environment node
 */
import axios from 'axios'

beforeAll(async () =>{
  const response = await axios.get('http://localhost:8080/swagger/api')
  const { data } = response
  expect(data).toBeDefined()
},30000)

test('web services available', async () => {
  jest.setTimeout(5000)
  const response = await axios.get('http://localhost:8080/swagger/api')
  const { data } = response
  expect(data.swagger).toEqual('2.0')
  const paths = Object.keys(data.paths)
  expect(paths.length).toBeGreaterThan(10)
  expect(paths).toContain('/annotationEditor/getAttributes')
},20000)
