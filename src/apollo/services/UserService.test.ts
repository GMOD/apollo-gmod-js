
/**
 *  @jest-environment node
 */

import {addUser, deleteUser, getUser, loadUsers} from './UserService'
import {User} from '../domain/User'
import {sleep} from '../functions/Timing'
import {ADMIN_PASS, ADMIN_USER} from './TestCredentials'


const TEST_USER = 'trash2@bx.psu.ed'


test('Load Users', async () => {
  const users = await loadUsers(ADMIN_USER,ADMIN_PASS) as Array<User>
  expect(typeof users).not.toEqual('string')
  expect(users.length).toBeGreaterThan(0)
  // TODO: add a filter for 'admin@local.host
  const user:User =  users.filter( s => s.username == ADMIN_USER)[0]
  expect(user.firstName).toEqual('Ad')
  expect(user.lastName).toEqual('min')
  expect(user.inactive).toEqual(false)
  expect(user.role).toEqual('ADMIN')
  expect(user.username).toEqual(ADMIN_USER)

})

test('Get User', async () => {
  const user = await getUser(ADMIN_USER,ADMIN_USER,ADMIN_PASS) as User
  expect(typeof user).not.toEqual('string')
  expect(user.firstName).toEqual('Ad')
  expect(user.lastName).toEqual('min')
  expect(user.username).toEqual(ADMIN_USER)

})

test('Delete User', async () => {
  const hasUser = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  const resultA = await addUser(TEST_USER,'topsecret','Poutrelle','Lapinou',ADMIN_USER,ADMIN_PASS) as User
  expect(resultA.username).toEqual(TEST_USER)
  await sleep(500)
  const resultB = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  expect(resultB.username).toEqual(TEST_USER)
  const resultC = await deleteUser(TEST_USER,ADMIN_USER,ADMIN_PASS) as User
  expect(resultC.username).toEqual(TEST_USER)
  const resultD = await getUser(TEST_USER,ADMIN_USER,ADMIN_PASS)
  expect(resultD).toBeUndefined()

})

beforeEach( async () => {
  await deleteUser(TEST_USER,ADMIN_USER,ADMIN_PASS)
})

afterEach( async () => {
  await deleteUser(TEST_USER,ADMIN_USER,ADMIN_PASS)
})
