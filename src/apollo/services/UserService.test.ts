
/**
 *  @jest-environment node
 */
// import {User} from "./User";

import {loadUsers} from "./UserService";
import {User} from "../domain/User";

test('Load Users', async () => {
  // let user  = new User()
  // user.firstName = 'Bob'
  // user.lastName = 'Jones'
  // user.username = 'bob.jones@test.com'
  // expect(user).toEqual({ firstName:'Bob',lastName: 'Jones',username:'bob.jones@test.com' })


  // console.log('a')
  const users = await loadUsers()
  // console.log('b')
  // console.log(users)
  expect(users.length).toEqual(1)
  let user = users[0]
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
      userId: 49,
      organismPermissions: [],
      username: 'admin@local.host'
    } )
  // console.log('c')

});

