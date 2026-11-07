import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'

const typeDefs = `
  type Query {
    helloWorld: String
  }
`

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        helloWorld: () => 'Hello World!',
      },
    },
  })

  const {} = await startStandaloneServer(server, {
    listen: {port: 4000},
  })

  console.log(`🚀 Server ready at http://localhost:4000/`)
}

bootstrap()
