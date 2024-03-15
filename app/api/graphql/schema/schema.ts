export const typeDefs = `
  scalar JSON
  type Comment {
    id: ID
    movieId: Int
    content: JSON
    author: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    comments(movieId: Int!): [Comment]!
  }

  type Mutation {
    createComment(movieId: Int!, content: JSON!, author: String!): Comment!
    deleteComment(id: ID!): Comment!
    updateComment(id: ID!, movieId: Int!, content: JSON!, author: String!): Comment!
  }
`;
