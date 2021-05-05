import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

export const getSequenceForFeatures = async (organism:string,sequence:string,feature:string,type:string): Promise<Array<string> | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/sequence/${organism}/${sequence}/${feature}.${type}?ignoreCache=true`)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}
