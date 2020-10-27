
/**
 *  @jest-environment node
 */
// import {User} from "./User";

import {loadUsers} from "./UserService";

test('Load Users', async () => {
  // let user  = new User()
  // user.firstName = 'Bob'
  // user.lastName = 'Jones'
  // user.username = 'bob.jones@test.com'
  // expect(user).toEqual({ firstName:'Bob',lastName: 'Jones',username:'bob.jones@test.com' })


  console.log('a')
  const users = await loadUsers()
  console.log('b')
  console.log(users)
  expect(users.length).toEqual(2)
  console.log('c')

});

