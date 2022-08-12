const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User{
    _id: ID!
    username: String!
    email: String!
    # no password feild, need to keep passwords hidden
  }
  type Query {
    users: [User]
  }
  type Mutation {
    createUser( username: String!, email: String!, password: String! ): User
  }
`;

module.exports = typeDefs;