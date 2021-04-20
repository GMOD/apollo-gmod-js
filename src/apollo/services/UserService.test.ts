
/**
 *  @jest-environment node
 */

import {addUser, deleteUser, getUser, loadUsers} from './UserService'
import {User} from '../domain/User'
import {sleep} from '../functions/Timing'

const TEST_USER = 'admin@local.host'
const TEST_PASS = 'password'

test('Load Users', async () => {
  const users = await loadUsers(TEST_USER,TEST_PASS) as Array<User>
  expect(typeof users).not.toEqual('string')
  expect(users.length).toBeGreaterThan(0)
  // TODO: add a filter for 'admin@local.host
  const user:User =  users.filter( s => s.username == TEST_USER)[0]
  expect(user.firstName).toEqual('Ad')
  expect(user.lastName).toEqual('min')
  expect(user.inactive).toEqual(false)
  expect(user.role).toEqual('ADMIN')
  expect(user.username).toEqual(TEST_USER)

})

test('Get User', async () => {
  const user = await getUser(TEST_USER,TEST_USER,TEST_PASS) as User
  expect(typeof user).not.toEqual('string')
  expect(user.firstName).toEqual('Ad')
  expect(user.lastName).toEqual('min')
  expect(user.username).toEqual(TEST_USER)

})

test('Delete User', async () => {
  const hasUser = await getUser('trash2@bx.psu.edu',TEST_USER,TEST_PASS) as User
  const resultA = await addUser('trash2@bx.psu.edu','topsecret','Poutrelle','Lapinou',TEST_USER,TEST_PASS) as User
  expect(resultA.username).toEqual('trash2@bx.psu.edu')
  await sleep(500)
  const resultB = await getUser('trash2@bx.psu.edu',TEST_USER,TEST_PASS) as User
  expect(resultB.username).toEqual('trash2@bx.psu.edu')
  const resultC = await deleteUser('trash2@bx.psu.edu',TEST_USER,TEST_PASS) as User
  expect(resultC.username).toEqual('trash2@bx.psu.edu')
  const resultD = await getUser('trash2@bx.psu.edu',TEST_USER,TEST_PASS)
  expect(resultD).toBeUndefined()

})

beforeEach( async () => {
  await deleteUser('trash2@bx.psu.edu',TEST_USER,TEST_PASS)
})

afterEach( async () => {
  await deleteUser('trash2@bx.psu.edu',TEST_USER,TEST_PASS)
})
