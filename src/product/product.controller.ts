import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { productZodSchemaType } from "@/product/product.zod.schema";

const prisma = new PrismaClient();

export const ProductController = {
  create: async (
    request: FastifyRequest<{ Body: productZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const createProductResult = await prisma.products.create({
      data: {
        name: request.body.name,
      },
    });
    console.log(createProductResult);
  },
};
