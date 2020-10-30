import {User} from '../domain/User'
import axios from 'axios'


// export function getUser(username: string){
//
// }

export const loadUsers = async (): Promise<Array<User>|string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/user/loadUsers')
    const { data } = await response
    return data
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}
