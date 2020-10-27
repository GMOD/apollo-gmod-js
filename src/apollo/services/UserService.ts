import {User} from "../domain/User";


export class UserService{

}

export function getUser(username: string){

}

export function loadUsers(): Array<User>{

  let users = Array<User>()
  users.push( new User())
  users.push( new User())

  return users
}
