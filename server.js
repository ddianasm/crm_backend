import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { usersRoutes } from "./routes/routes.js";
import config from "./config.js";

export const BuildServer = async () => {
  const server = fastify({});

  server.register(fastifyCors, {
    origin: "http://localhost:3002",
    //   credentials: true,
  });
  server.register(usersRoutes);

  await server.listen({
    port: config.port,
    host: "0.0.0.0",
  });

  console.log(`Server is running on port ${config.port}`);
};
