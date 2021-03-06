import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

export const annotationEditorCommand = async (inputData: JSON, command: string): Promise<Array<string> | string> => {

  try {
    const response = await axios.post(`${ApolloServer.getHost()}/annotationEditor/${command}`, inputData)
    const {data} = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}