import {User} from "./User";

test('User object test', async () => {
  let user  = new User(
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
    }
  )
  // user.firstName = 'Bob'
  // user.lastName = 'Jones'
  // user.username = 'bob.jones@test.com'
  expect(user).toEqual(
    {
      _firstName: 'Admin',
      _lastName: 'User',
      _inactive: false,
      _role: 'ADMIN',
      _userId: 49,
      _username: 'admin@local.host'
    }

  )
});
