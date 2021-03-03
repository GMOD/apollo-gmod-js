import {promisify} from 'util'
import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

export const sleep = promisify(setTimeout)

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
  expect(allParts.length).toEqual(1)
  expect(allParts[0].name).toEqual('jill')
})