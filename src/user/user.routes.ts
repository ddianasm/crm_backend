import { FastifyPluginCallback } from "fastify";
import { UserController } from "@/user/user.controller";

export const UserRoutes: FastifyPluginCallback = async (server, opts, done) => {
  server.route({
    url: "/user/create",
    method: "POST",
    // schema: {
    //   body: { username: string, password: string },
    // },
    handler: UserController.create,
  });

  done();
};
