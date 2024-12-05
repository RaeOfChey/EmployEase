import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        removeBook(bookId: String!): User
    }

    type User {
        _id: ID
        username: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
    }

    type Auth {
        token: String
        user: User
    }

    input BookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
    }
`;


export default typeDefs;