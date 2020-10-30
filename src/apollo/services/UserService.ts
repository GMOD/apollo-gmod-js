import {User} from '../domain/User'
import axios from 'axios'


export const loadUsers = async (): Promise<Array<User> | string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/user/loadUsers')
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const addUser = async (username:string,firstName:string,lastName:string,role = 'user'): Promise<User | string> => {

  try {
    const response = await axios.post( 'http://localhost:8080/user/createUser',{
      email:username,
      firstName:firstName,
      lastName:lastName,
      role:role.toUpperCase(),
    })
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const getUser = async (username:string): Promise<User | string> => {

  try {
    const response = await axios.post( 'http://localhost:8080/user/getUser',{username:username})
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
export const deleteUser = async (username: string): Promise<User | string> => {

  try {
    const response = await axios.post( 'http://localhost:8080/user/deleteUser')
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
