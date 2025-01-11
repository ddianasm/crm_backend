import { FastifyPluginCallback } from "fastify";
import { UserController } from "@/auth/auth.controller";
import { AuthMiddleware } from "@/auth/auth.middleware";
import userSchema from "@/auth/auth.zod.schema"

export const UserRoutes: FastifyPluginCallback = async (server, opts, done) => {
  server.route({
    url: "/auth",
    method: "GET",
    preHandler: [AuthMiddleware],
    handler: UserController.isAuth,
  });

  server.route({
    url: "/auth/signup",
    method: "POST",
    schema: {
      body: userSchema.json.$ref,
    },
    preHandler: [],
    handler: UserController.signUp,
  });

  server.route({
    url: "/auth/signin",
    method: "POST",
    schema: {
      body: userSchema.json.$ref,
    },
    preHandler: [],
    handler: UserController.signIn,
  });

  server.route({
    url: "/auth/logout",
    method: "GET",
    preHandler: [AuthMiddleware],
    handler: UserController.logout,
  });

  done();
};
