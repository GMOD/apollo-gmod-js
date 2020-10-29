
/**
 *  @jest-environment node
 */
// import {User} from "./User";

import {loadUsers} from './UserService'
import {User} from '../domain/User'

test('Load Users', async () => {
  const users = await loadUsers()
  console.log('returned users',users)
  expect(users.length).toEqual(1)
  const user = users[0]
  expect(user.firstName).toEqual('Admin')
  expect(user.lastName).toEqual('User')
  expect(user.inactive).toEqual(false)
  expect(user.role).toEqual('ADMIN')
  expect(user.username).toEqual('admin@local.host')

})

