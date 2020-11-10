import axios from 'axios'
import {ProteinCodingTranscript} from '../domain/ProteinCodingTranscript'


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const addTranscript = async (inputData:JSON): Promise<Array<ProteinCodingTranscript> | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/annotationEditor/addTranscript',inputData)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}
