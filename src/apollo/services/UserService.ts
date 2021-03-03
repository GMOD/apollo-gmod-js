import {User} from '../domain/User'
import axios from 'axios'
import {ApolloServer} from '../ApolloServer'


export const loadUsers = async (): Promise<Array<User> | string> => {

  try {
    const response = await axios.get( `${ApolloServer.getHost()}/user/loadUsers`)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const addUser = async (username:string,firstName:string,lastName:string,role = 'user'): Promise<User | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/user/createUser`,{
      email:username,
      firstName:firstName,
      lastName:lastName,
      password:'password',
      role:role.toUpperCase(),
    })
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const getUser = async (username:string): Promise<User | string | undefined> => {

  try
  {
    console.log('getting user',username)
    const response = await axios.post( `${ApolloServer.getHost()}/user/getUser`,{username:username})
    const { data } = await response
    console.log('got user',data)
    return data
  } catch (error) {
    // console.error(error)
    return undefined
    // return error.message ? error.message : error
  }
}
export const deleteUser = async (username: string): Promise<User | string | null> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/user/deleteUser`,{userToDelete: username})
    const { data } = await response
    return data
  } catch (error) {
    return null
    // return error.message ? error.message : error
  }
}
