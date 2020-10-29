
/**
 *  @jest-environment node
 */
// import {User} from "./User";

import {loadUsers} from './UserService'
import {User} from '../domain/User'

test('Load Users', async () => {
  const users = await loadUsers()
  expect(users.length).toEqual(1)
  const user = users[0]
  expect(user).toEqual(
    {
      firstName: 'Admin',
      lastName: 'User',
      inactive: false,
      role: 'ADMIN',
      availableGroups: [],
      userCount: 1,
      searchName: null,
      groups: [],
      userId: 19,
      organismPermissions: [],
      username: 'admin@local.host'
    } )
  console.log('c')

})

