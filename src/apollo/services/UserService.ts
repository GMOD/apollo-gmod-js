import {User} from '../domain/User'
import axios from 'axios'


// export function getUser(username: string){
//
// }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const loadUsers = async (): Promise<Array<User>|string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/user/loadUsers')
    return await response.data
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}
