import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { productZodSchemaType } from "@/product/product.zod.schema";

const prisma = new PrismaClient();

export const ProductController = {
  add: async (
    request: FastifyRequest<{ Body: productZodSchemaType }>,
    reply: FastifyReply
  ) => {
    try {
      const username = request.cookies?.username;
      if (!username) {
        return reply.status(401).send({ message: 'No authentication cookie provided' });
      }

      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user) {
        return reply.status(401).send({ message: 'User not authenticated' });
      }

      const addProductResult = await prisma.product.create({
        data: {
          name: request.body.name,
          amount: request.body.amount,
          price: request.body.price,
          customer: request.body.customer,
          email: request.body.email,
          phone: request.body.phone,
          date: new Date(),
          status: request.body.status,
          userId: user.id
        },
      });

      return reply.status(201).send({ message: 'Product added', product: addProductResult });
    } catch (error) {
      console.error('Error adding product:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return reply.status(400).send({ message: 'Database error', details: error.message });
      } else {
        return reply.status(500).send({ message: 'Internal server error' });
      }
    }
  },

  delete: async (
    request: FastifyRequest<{ Body: number[] }>,
    reply: FastifyReply
  ) => {
    try {
      const deletedProducts = await prisma.product.deleteMany({
        where: {
          id: {
            in: request.body,
          },
        },
      });

      if (deletedProducts.count === 0) {
        return reply.status(404).send({ message: 'No products found to delete' });
      }

      return reply.status(200).send({
        message: `${deletedProducts.count} products deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting products:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return reply.status(400).send({ message: 'Database error', details: error.message });
      } else {
        return reply.status(500).send({ message: 'Internal server error' });
      }
    }
  },

  getProducts: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const usernameCookie = request.cookies?.username;
      if (!usernameCookie) {
        return reply.status(401).send({ message: 'No authentication cookie provided' });
      }

      const user = await prisma.user.findUnique({
        where: { username: usernameCookie },
      });

      if (!user) {
        return reply.status(401).send({ message: 'User not authenticated' });
      }

      const products = await prisma.product.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          name: true,
          amount: true,
          price: true,
          customer: true,
          email: true,
          phone: true,
          date: true,
          status: true
        }
      });

      if (products.length === 0) {
        return reply.status(404).send({ message: 'No products found' });
      }

      return reply.status(200).send(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return reply.status(400).send({ message: 'Database error', details: error.message });
      } else {
        return reply.status(500).send({ message: 'Internal server error' });
      }
    }
  },

  getColumns: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const columns = Object.keys(prisma.product.fields);
      if (!columns || columns.length === 0) {
        return reply.status(500).send({ message: 'Unable to retrieve columns' });
      }

      const filteredColumns = columns.filter(col => col !== 'id' && col !== 'user' && col !== 'userId');

      if (filteredColumns.length === 0) {
        return reply.status(404).send({ message: 'Columns not found' });
      }

      return reply.status(200).send({ message: 'Columns retrieved successfully', columns: filteredColumns });
    } catch (error) {
      console.error('Error retrieving columns:', error);
      return reply.status(500).send({ message: 'Internal server error' });
    }
  }
};
