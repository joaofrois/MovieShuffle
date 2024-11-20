import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import { typeDefs } from "@/schemas/movie.schema";
import { resolvers } from "@/resolvers/movie.resolver";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

const requestLoggingPlugin: ApolloServerPlugin = {
  async requestDidStart(requestContext) {
    console.log("Request started! Query:\n" + requestContext.request.query);
    return {
      async willSendResponse(responseContext) {
        console.log("Response:\n", responseContext.response);
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [requestLoggingPlugin],
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
