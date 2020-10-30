
/**
 *  @jest-environment node
 */

import {loadUsers} from './UserService'
import {User} from '../domain/User'

test('Load Users', async () => {
  const users = await loadUsers() as Array<User>
  console.log(users)
  console.log(typeof users)
  expect(typeof users).not.toEqual('string')
  // console.log('returned users',users)
  expect(users.length).toEqual(1)
  const user:User =  users[0] as User
  expect(user.firstName).toEqual('Admin')
  expect(user.lastName).toEqual('User')
  expect(user.inactive).toEqual(false)
  expect(user.role).toEqual('ADMIN')
  expect(user.username).toEqual('admin@local.host')

})

