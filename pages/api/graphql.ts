import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import connect from "next-connect";
import cors from "cors";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "graphql/resolvers/generated/type-graphql";
import prisma from "lib/prisma-client";
import { __prod__ } from "helpers/constants";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = connect<NextApiRequest, NextApiResponse>();

const apiHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (handler && __prod__) return handler(req, res);

  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: () => ({ prisma }),
  });

  await apolloServer.start();

  const apolloHandler = apolloServer.createHandler({
    path: "/api/graphql",
  });

  return apolloHandler(req, res);
};

export default connect()
  .use(
    cors({
      credentials: !__prod__,
      origin: __prod__
        ? []
        : ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  )
  .use(apiHandler);
