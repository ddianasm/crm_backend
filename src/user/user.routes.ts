import { FastifyPluginCallback } from "fastify";
import { UserController } from "@/user/user.controller";
import { userJsonSchema } from "@/user/user.zod.schema";

export const UserRoutes: FastifyPluginCallback = async (server, opts, done) => {
  server.route({
    url: "/user/create",
    method: "POST",
    schema: {
      body: userJsonSchema.$ref,
    },
    handler: UserController.create,
  });

  server.route({
    url: "/user/find",
    method: "POST",
    schema: {
      body: userJsonSchema.$ref,
    },
    handler: UserController.find,
  });

  done();
};
