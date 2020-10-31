
/**
 *  @jest-environment node
 */

import {addUser, deleteUser, getUser, loadUsers} from './UserService'
import {User} from '../domain/User'

test('Load Users', async () => {
  const users = await loadUsers() as Array<User>
  expect(typeof users).not.toEqual('string')
  // console.log('returned users',users)
  expect(users.length).toBeGreaterThan(0)
  // TODO: add a filter for 'admin@local.host
  const user:User =  users.filter( s => s.username == 'admin@local.host')[0]
  expect(user.firstName).toEqual('Admin')
  expect(user.lastName).toEqual('User')
  expect(user.inactive).toEqual(false)
  expect(user.role).toEqual('ADMIN')
  expect(user.username).toEqual('admin@local.host')

})

test('Get User', async () => {
  const user = await getUser('admin@local.host') as User
  expect(typeof user).not.toEqual('string')
  expect(user.firstName).toEqual('Admin')
  expect(user.lastName).toEqual('User')
  expect(user.username).toEqual('admin@local.host')

})

test('Add User', async () => {
  const userReturn = await addUser('trash@bx.psu.edu','Poutrelle','Lapinou') as User
  console.log(userReturn)
  console.log(typeof userReturn)
  // expect(typeof userReturn).not.toEqual('string')
  // expect(userReturn.error).toBeUndefined()
  expect(userReturn.firstName).toEqual('Poutrelle')
  expect(userReturn.lastName).toEqual('Lapinou')
  expect(userReturn.inactive).toEqual(false)
  expect(userReturn.username).toEqual('trash@bx.psu.edu')
  const resultC = await deleteUser('trash@bx.psu.edu') as User
})

test('Delete User', async () => {
  const resultA = await addUser('trash@bx.psu.edu','Poutrelle','Lapinou') as User
  console.log('result A',resultA)
  expect(resultA.username).toEqual('trash@bx.psu.edu')
  const resultB = await getUser('trash@bx.psu.edu') as User
  expect(resultB.username).toEqual('trash@bx.psu.edu')
  const resultC = await deleteUser('trash@bx.psu.edu') as User
  expect(resultC.username).toEqual('trash@bx.psu.edu')
  const resultD = await getUser('trash@bx.psu.edu') as User
  expect(resultD.username).not.toEqual('trash@bx.psu.edu')

})
