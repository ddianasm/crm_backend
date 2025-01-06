import { FastifyReply, FastifyRequest } from "fastify";
import { productZodSchemaType } from "@/product/product.zod.schema";
import { prisma } from "@/utils/prisma";
import { NotFoundError } from "@/utils/errors";
import { formatDate } from "@/utils/dateUtils";


export const ProductController = {
  add: async (request: FastifyRequest<{ Body: productZodSchemaType }>, reply: FastifyReply) => {
    const {
      name, amount, price, customer, email, phone, status
    } = request.body

    const addProductResult = await prisma.product.create({
      data: {
        name,
        amount,
        price,
        customer,
        email,
        phone,
        date: new Date(),
        status,
        userId: request.user?.id!,
      },
    });

    return reply.send({ message: 'Product added', product: addProductResult });
  },

  delete: async (request: FastifyRequest<{ Body: number[] }>, reply: FastifyReply) => {
    const deletedProducts = await prisma.product.deleteMany({
      where: { id: { in: request.body } }
    });

    if (deletedProducts.count === 0) {
      throw new NotFoundError('No products found to delete')
    }

    return reply.send({
      message: `${deletedProducts.count} products deleted successfully`,
    })
  },

  getProducts: async (request: FastifyRequest, reply: FastifyReply) => {
    const products = await prisma.product.findMany({
      where: { userId: request.user?.id! },
      select: {
        id: true,
        name: true,
        amount: true,
        price: true,
        customer: true,
        email: true,
        phone: true,
        date: true,
        status: true,
      },
      orderBy: {
        date: 'desc',
      },
    });


    // if (products.length === 0) throw new NotFoundError('No products found');
    const formattedProducts = products.map(product => ({
      ...product,
      date: formatDate(new Date(product.date)), // Перетворення дати
    }));

    return reply.send(formattedProducts);
  },

  getColumns: async (request: FastifyRequest, reply: FastifyReply) => {
    const columns = ['name', 'amount', 'price', 'customer', 'email', 'phone', 'date', 'status']

    return reply.send(columns);
  }
};
