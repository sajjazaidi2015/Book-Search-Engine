const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User{
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    # no password feild, need to keep passwords hidden
  }
  type Query {
    me: [User]
  }
  type Mutation {
    createUser( username: String!, email: String!, password: String! ): User
  }
`;

module.exports = typeDefs;