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

export const addUser = async (inputdata:JSON): Promise<User | string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/user/createUser')
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const getUser = async (username:string): Promise<User | string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/user/getUser')
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
