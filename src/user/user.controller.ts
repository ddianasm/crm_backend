import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { userZodSchemaType } from "@/user/user.zod.schema";

const prisma = new PrismaClient();

export const UserController = {
  signUp: async (
    request: FastifyRequest<{ Body: userZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const createUserResult = await prisma.users.create({
      data: {
        username: request.body.username,
        password: request.body.password,
      },
    });
    console.log(createUserResult);

    reply.setCookie("username", request.body.username, {
      maxAge: 86400000,
      path: "/",
      httpOnly: true,
    });
    reply.status(200).send();
  },
  signIn: async (
    request: FastifyRequest<{ Body: userZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const user = await prisma.users.findUnique({
      where: {
        username: request.body.username,
        password: request.body.password,
      },
    });
    if (user) {
      console.log(user);
      reply.setCookie("username", request.body.username, {
        maxAge: 86400000,
        path: "/",
        httpOnly: true,
      });
      reply.status(200).send();
    } else {
      console.log("user не авторизований");
      reply.status(401).send();
    }
  },
  isAuth: async (request: FastifyRequest, reply: FastifyReply) => {
    const username = request.cookies?.username;
    if (username) {
      console.log("username знайдено");
      console.log(username);
      reply.status(200).send();
    } else {
      console.log("username не знайдено");
      reply.status(401).send();
    }
  },
  addProduct: async (
    request: FastifyRequest<{ Body: { productId: number } }>,
    reply: FastifyReply
  ) => {
    const ourCookie = 'Діана'
    // знайти user по ourCookie

    // const user = await prisma.users.findUnique({
    //   where: {
    //     username: ourCookie
    //   },
    // })
    // console.log(user);

    // const product = await prisma.products.findUnique({
    //   where: {
    //     id: request.body.productId
    //   }
    // })
    // console.log(product);





    const user = await prisma.users.update({
      where: { username: ourCookie },
      data: {
        products: {
          connect: { id: request.body.productId }
        }
      }
    })
  }
}
// export const UserController = {
//   create: async ({
//     username,
//     password,
//   }: {
//     username: string;
//     password: string;
//   }) => {
//     const createUserResult = await prisma.user.create({
//       data: {
//         username: username,
//         password: password,
//       },
//     });
//     console.log(createUserResult);
//   },
// };
