import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { productZodSchemaType } from "@/product/product.zod.schema";

const prisma = new PrismaClient();

export const ProductController = {
  add: async (
    request: FastifyRequest<{ Body: productZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const username = request.cookies?.username;
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      console.log("User not found by name", username);
      return reply.status(404).send('User not found')
    }
    const addProductResult = await prisma.product.create({
      data: {
        name: request.body.name,
        userId: user.id
      },
    });
    console.log(addProductResult);
    return reply.status(200).send('Product added')
  },
  delete: async (
    request: FastifyRequest<{ Body: productZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const username = request.cookies?.username;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return reply.status(401).send('User not found');
    }
    const product = await prisma.product.delete({
      where: { name: request.body.name, userId: user?.id }
    })
    if (!product) {
      return reply.status(401).send('Product not found');
    }
    return reply.status(200).send('Product deleted');

  },
  getProducts: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const username = request.cookies?.username;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return reply.status(401).send('User not found');
    }
    const products = await prisma.product.findMany({
      where: { userId: user?.id }
    })
    if (!products) {
      return reply.status(401).send('Products not found');
    }
    return reply.status(200).send(products)
  }
};
