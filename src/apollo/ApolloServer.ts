
export class ApolloServer{

  static getHost():string{
    const output = process.env.APOLLO_URL || 'http://localhost:8080/apollo'
    return output
  }

}