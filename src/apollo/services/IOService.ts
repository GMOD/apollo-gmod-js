import axios from 'axios'
import {ApolloServer} from '../ApolloServer'


export const writeFile = async (inputData:JSON): Promise<Array<string> | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/IOService/write`,inputData)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}

export const downloadFile = async (inputData:JSON): Promise<Array<string> | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/IOService/download`,inputData)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}
