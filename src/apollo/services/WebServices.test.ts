/**
 *  @jest-environment node
 */
import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

const API_URL = ApolloServer.getHost()+'/WebServices'

beforeAll(async () =>{
  const response = await axios.get(API_URL)
  const { data } = response
  expect(data).toBeDefined()
},30000)

test('web services available', async () => {
  jest.setTimeout(5000)
  const response = await axios.get(API_URL)
  const { data } = response
  expect(data).toContain('api.description')
},20000)
