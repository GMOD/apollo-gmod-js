
export class ApolloServer{

  static getHost():string{
    console.log('getting host ',process.env.APOLLO_URL)
    const output = process.env.APOLLO_URL || 'http://localhost:8080/apollo'
    console.log('output: ',output)
    return output
  }

}