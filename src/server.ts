import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { UserRoutes } from "@/user/user.routes";
import config from "@/config";
import { userJsonSchema } from "@/user/user.zod.schema";

export const BuildServer = async () => {
  const server = fastify({});

  server.addSchema(userJsonSchema.schema);
  server.register(fastifyCors, {
    origin: "http://localhost:3002",
    credentials: true,
  });
  server.register(UserRoutes);

  await server.listen({
    port: config.port,
    host: "0.0.0.0",
  });

  console.log(`Server is running on port ${config.port}`);
};
