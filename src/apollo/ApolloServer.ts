
export class ApolloServer{

  getHost():string{
    return process.env.APOLLO_URL || 'http://localhost:8080'
  }

}