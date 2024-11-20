import { gql } from "apollo-server";

export const typeDefs = gql`
  type Movie {
    title: String!
    description: String!
    posterUrl: String!
    rating: Float!
  }

  type Query {
    randomMovies: [Movie!]!
  }
`;
