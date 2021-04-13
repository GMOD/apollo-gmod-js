
/**
 *  @jest-environment node
 */

import {addUser, deleteUser, getUser, loadUsers} from './UserService'
import {User} from '../domain/User'
import {sleep} from '../functions/Timing'

test('Load Users', async () => {
  const users = await loadUsers() as Array<User>
  expect(typeof users).not.toEqual('string')
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

test('Delete User', async () => {
  const resultA = await addUser('trash2@bx.psu.edu','Poutrelle','Lapinou') as User
  expect(resultA.username).toEqual('trash2@bx.psu.edu')
  let users = await loadUsers() as Array<User>
  await sleep(500)
  const resultB = await getUser('trash2@bx.psu.edu') as User
  console.log('result b',resultB)
  expect(resultB.username).toEqual('trash2@bx.psu.edu')
  const resultC = await deleteUser('trash2@bx.psu.edu') as User
  expect(resultC.username).toEqual('trash2@bx.psu.edu')
  users = await loadUsers() as Array<User>
  let resultD = await getUser('trash2@bx.psu.edu')
  resultD = await getUser('trash2@bx.psu.edu')
  expect(resultD).toBeUndefined()

})

beforeEach( async () => {
  await deleteUser('trash2@bx.psu.edu')
})

afterEach( async () => {
  await deleteUser('trash2@bx.psu.edu')
})
