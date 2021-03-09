import {Organism} from './Organism'

test('Organism object test', () => {
  const organism = new Organism(
    {
      commonName: 'temp_org',
      directory: '/some/temp',
      uniquename: 'asdf-123',
    }
  )
  // user.firstName = 'Bob'
  expect(organism).toEqual(
    {
      commonName: 'temp_org',
      directory: '/some/temp',
      uniquename: 'asdf-123',
    }

  )
})
