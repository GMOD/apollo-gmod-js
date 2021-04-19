/**
 *  @jest-environment node
 */
import axios from 'axios'

beforeAll(async () =>{
  const response = await axios.get('http://localhost:8080/api')
  const { data } = response
  expect(data).toBeDefined()
},30000)

test('web services available', async () => {
  jest.setTimeout(5000)
  const response = await axios.get('http://localhost:8080/api')
  const { data } = response
  expect(data).toContain('/swagger/apollo-3.0.0.yml')
  // const paths = Object.keys(data.paths)
  // expect(paths.length).toBeGreaterThan(10)
  // expect(paths).toContain('/organism/deleteOrganism')
},20000)
