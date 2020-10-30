
/**
 *  @jest-environment node
 */

import {addUser, getUser, loadUsers} from './UserService'
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

test('Get User', async () => {
  const user = await getUser('admin@local.host') as User
  console.log('input user:',user)
  console.log(user)
  expect(typeof user).not.toEqual('string')
  expect(user.firstName).toEqual('Admin')
  expect(user.lastName).toEqual('User')
  // expect(user.inactive).toEqual(false)
  // expect(user.role).toEqual('ADMIN')
  expect(user.username).toEqual('admin@local.host')

})

// test('Add User', async () => {
//   const userReturn = await addUser('trash@bx.psu.edu','Poutrelle','Lapinou') as User
//   console.log(userReturn)
//   // console.log(typeof users)
//   // expect(typeof users).not.toEqual('string')
//   // // console.log('returned users',users)
//   // expect(users.length).toEqual(1)
//   // const user:User =  users[0] as User
//   // expect(user.firstName).toEqual('Admin')
//   // expect(user.lastName).toEqual('User')
//   // expect(user.inactive).toEqual(false)
//   // expect(user.role).toEqual('ADMIN')
//   // expect(user.username).toEqual('admin@local.host')
//
// })
//
// test('Delete User', async () => {
//   const userReturn = await addUser('trash@bx.psu.edu','Poutrelle','Lapinou') as User
//   console.log(userReturn)
//   // console.log(typeof users)
//   // expect(typeof users).not.toEqual('string')
//   // // console.log('returned users',users)
//   // expect(users.length).toEqual(1)
//   // const user:User =  users[0] as User
//   // expect(user.firstName).toEqual('Admin')
//   // expect(user.lastName).toEqual('User')
//   // expect(user.inactive).toEqual(false)
//   // expect(user.role).toEqual('ADMIN')
//   // expect(user.username).toEqual('admin@local.host')
//
// })
//
