import {User} from '../domain/User'
import axios from 'axios'
import {ApolloServer} from '../ApolloServer'


export const loadUsers = async (username:string,password:string): Promise<Array<User> | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/user/loadUsers`,{username,password})
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const addUser = async (email:string,newPassword:string,firstName:string,lastName:string,username:string,password:string,
  role = 'user'): Promise<User | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/user/createUser`,{
      email,
      newPassword,
      firstName:firstName,
      lastName:lastName,
      username,
      password,
      role:role.toUpperCase(),
    })
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const getUser = async (userId:string,username:string,password:string): Promise<User | string | undefined> => {

  try
  {
    const response = await axios.post( `${ApolloServer.getHost()}/user/loadUsers`,{userId,username,password})
    const { data } = await response
    return data && data.length>0 ? data[0] : undefined
  } catch (error) {
    console.error(error)
    return undefined
    // return error.message ? error.message : error
  }
}
export const deleteUser = async (userId: string,username:string,password:string): Promise<User | string | null> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/user/deleteUser`,{userToDelete: userId,username,password})
    const { data } = await response
    return data
  } catch (error) {
    console.error(error)
    return null
    // return error.message ? error.message : error
  }
}
