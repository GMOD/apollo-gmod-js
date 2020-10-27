import {User} from "./User";

test('User object test', async () => {
  let user  = new User()
  user.firstName = 'Bob'
  user.lastName = 'Jones'
  user.username = 'bob.jones@test.com'
  expect(user).toEqual({ firstName:'Bob',lastName: 'Jones',username:'bob.jones@test.com' })
});
