import { FastifyPluginCallback } from "fastify";
import { UserController } from "@/auth/auth.controller";
import { userJsonSchema } from "@/auth/auth.zod.schema";
import { AuthMiddleware } from "@/auth/auth.middleware";

export const UserRoutes: FastifyPluginCallback = async (server, opts, done) => {
  server.route({
    url: "/sign-up",
    method: "POST",
    schema: {
      body: userJsonSchema.$ref,
    },
    preHandler: [],
    handler: UserController.signUp,
  });

  server.route({
    url: "/sign-in",
    method: "POST",
    schema: {
      body: userJsonSchema.$ref,
    },
    preHandler: [],
    handler: UserController.signIn,
  });

  server.route({
    url: "/auth",
    method: "GET",
    // preHandler: [AuthMiddleware],
    handler: UserController.isAuth,
  });

  server.route({
    url: "/logout",
    method: "GET",
    preHandler: [],
    handler: UserController.logout,
  });

  done();
};
