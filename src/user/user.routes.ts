import { FastifyPluginCallback } from "fastify";
import { UserController } from "@/user/user.controller";
import { userJsonSchema } from "@/user/user.zod.schema";

export const UserRoutes: FastifyPluginCallback = async (server, opts, done) => {
  server.route({
    url: "/sign_up",
    method: "POST",
    schema: {
      body: userJsonSchema.$ref,
    },
    handler: UserController.signUp,
  });

  server.route({
    url: "/sign_in",
    method: "POST",
    schema: {
      body: userJsonSchema.$ref,
    },
    handler: UserController.signIn,
  });

  server.route({
    url: "/auth",
    method: "GET",
    handler: UserController.isAuth,
  });

  server.route({
    url: "/add_product",
    method: "POST",
    handler: UserController.addProduct
  })

  done();
};
