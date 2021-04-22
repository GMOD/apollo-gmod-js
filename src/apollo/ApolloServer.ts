
export class ApolloServer{

  static getHost():string{
    return process.env.APOLLO_URL || 'http://localhost:8080/apollo'
  }

}