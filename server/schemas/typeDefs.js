const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User{
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    # no password feild, need to keep passwords hidden
  }
  type Book {
    _id: ID
    authors: [String]
    description: String
    title: String
    link: String
    bookId: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    createUser( username: String!, email: String!, password: String! ): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String!], bookId: String!, image: String, title: String!): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;