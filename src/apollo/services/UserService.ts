import {User} from '../domain/User'
import axios from 'axios'


// export function getUser(username: string){
//
// }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const loadUsers = async (): Promise<Array<string> | string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/user/loadUsers')
    const { data } = await response
    // console.log('return data',data)
    // const  users = new Array<User>()
    // console.log('return data length',data.length)
    return data
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}
