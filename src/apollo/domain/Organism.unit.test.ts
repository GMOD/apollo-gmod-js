import {Organism} from './Organism'

test('Organism object test', async () => {
  const organism = new Organism(
    {
      commonName: 'temp_org',
      directory: '/some/temp',
      uniqueName: 'asdf-123',
    }
  )
  // user.firstName = 'Bob'
  // user.lastName = 'Jones'
  // user.username = 'bob.jones@test.com'
  expect(organism).toEqual(
    {
      commonName: 'temp_org',
      directory: '/some/temp',
      uniqueName: 'asdf-123',
    }

  )
})
