
/**
 *  @jest-environment node
 */

import {addUser, deleteUser, getUser, loadUsers} from './UserService'
import {User} from '../domain/User'

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
  const resultB = await getUser('trash2@bx.psu.edu') as User
  expect(resultB.username).toEqual('trash2@bx.psu.edu')
  const resultC = await deleteUser('trash2@bx.psu.edu') as User
  expect(resultC.username).toEqual('trash2@bx.psu.edu')
  const users = await loadUsers() as Array<User>
  const resultD = await getUser('trash2@bx.psu.edu')
  expect(resultD).toContain('404')
  expect(resultD.username).not.toEqual('trash2@bx.psu.edu')

})

// beforeEach(() => {
//   initializeCityDatabase();
// });
//
// afterEach(() => {
//   clearCityDatabase();
// });
