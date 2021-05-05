import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

/**
 * Returns common path and local server info
 */
export const getServerInfo = async (): Promise<string> => {

  try {
    const response = await axios.get( `${ApolloServer.getHost()}/annotator/getSystemInfo`)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

/**
 * Returns common path and local server info
 */
export const updateCommonPath = async (directory:string): Promise<string> => {
  try {
    const response = await axios.post(
      `${ApolloServer.getHost()}/annotator/updateCommonPath`,
      {directory:directory}
    )
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
