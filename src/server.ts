import fastify, { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { UserRoutes } from "@/auth/auth.routes";
import config from "@/config";
import { productJsonSchema } from "@/product/product.zod.schema";
import { ProductRoutes } from "@/product/product.routes";
import { ExeptionError } from "@/utils/errors";
import userSchema from "@/auth/auth.zod.schema"

export const BuildServer = async () => {
  const server = fastify({});

  server.register(fastifyCookie, {
    secret: "my-secret",
  });

  server.addSchema(userSchema.json.schema);
  server.addSchema(productJsonSchema.schema);
  server.register(fastifyCors, {
    origin: "http://localhost:3005",
    credentials: true,
  });
  server.register(UserRoutes);
  server.register(ProductRoutes)

  server.setErrorHandler((error, req, reply) => {
    const { code, message } = error as unknown as ExeptionError
    reply
      .status(code)
      .send({ message });
  })

  await server.listen({
    port: config.port,
    host: "0.0.0.0",
  });

  console.log(`Server is running on port ${config.port}`);
};
