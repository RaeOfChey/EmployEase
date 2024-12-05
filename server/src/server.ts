import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
// Import the ApolloServer class
import {
  ApolloServer,
} from '@apollo/server';
import {
  expressMiddleware
} from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';


const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authenticateToken as any
      },
  ))
    /*
    expressMiddleware(server, {
      context: async ({ req }) => {
        const context = await authenticateToken({ req });
        console.log("Incoming Context Obj: ", context);
        return context; // Return the context with the user
      },
    }) */
  //);
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(),'client','dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(),'client','dist','index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });

};

// Call the async function to start the server
startApolloServer();