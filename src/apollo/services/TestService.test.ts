import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

/**
 * This is a simple test service class to test routes in the TestController for debugging only.
 */

const doAllParts1 = async (): Promise<Array<any> | string> => {

  try {
    const response = await axios.get( `${ApolloServer.getHost()}/test/doAllParts1`)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}

test('Validate test class', async() => {
  const allParts = await doAllParts1()
  console.log(JSON.stringify(allParts))
  expect(allParts.length).toEqual(1)
  expect(allParts[0].name).toEqual('jill')
})