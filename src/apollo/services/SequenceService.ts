import axios from 'axios'
import {ApolloServer} from '../ApolloServer'

export const getSequenceForFeatures = async (organism:string,sequence:string,feature:string,type:string,username:string,password:string): Promise<Array<string> | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/sequence/${organism}/${sequence}/${feature}.${type}?ignoreCache=true`,{username,password})
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }

}
