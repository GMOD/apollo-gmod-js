import {User} from "../domain/User";
import axios from 'axios';

export class UserService{

}

export function getUser(username: string){

}

export const loadUsers = async (): Promise<Array<User> | string> => {

  let users = Array<User>()
  users.push( new User('Bob','Jones','bob.jones@test.com'))
  users.push( new User('Jill','Johnson','jill.johnson@test.com'))

 // const response = await axios.get( 'http://localhost:8080/user/loadUsers')

  try {
    const response = await axios.get( 'http://localhost:8080/user/loadUsers')
    // const response = await fetch( 'http://localhost:8080/user/loadUsers')
    console.log('response',response)
    // const { data } = await response.json()
    const { data } = await response
    return data
  } catch (error) {
    if (error) {
      return error.message
    }
  }



  return users
}
