import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { productZodSchemaType } from "@/product/product.zod.schema";

const prisma = new PrismaClient();

export const ProductController = {
  create: async (
    request: FastifyRequest<{ Body: productZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const username = request.cookies?.username;
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      console.log("User not found by name", username);
      return reply.status(404)
    }
    const createProductResult = await prisma.product.create({
      data: {
        name: request.body.name,
        userId: user.id
      },
    });
    console.log(createProductResult);
    return reply.status(200)
  },
  getProducts: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const username = request.cookies?.username;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      const products = await prisma.product.findMany({
        where: { userId: user.id }
      })
      console.log(products);
      reply.send(products)
    } else {
      console.log('Error when searching for products');
      reply.status(400).send();
    }
  }
};
