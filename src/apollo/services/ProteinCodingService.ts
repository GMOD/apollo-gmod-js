import axios from 'axios'
import {ApolloServer} from '../ApolloServer'


export const addTranscript = async (inputData:JSON): Promise<Array<string> | string> => {

  try {
    console.log('add transcdript url',`${ApolloServer.getHost()}/annotationEditor/addTranscript`)
    console.log('add transcdript data',JSON.stringify(inputData))
    const response = await axios.post( `${ApolloServer.getHost()}/annotationEditor/addTranscript`,inputData)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}

