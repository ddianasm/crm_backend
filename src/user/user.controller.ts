import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { userZodSchemaType } from "@/user/user.zod.schema";

const prisma = new PrismaClient();

export const UserController = {
  create: async (
    request: FastifyRequest<{ Body: userZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const createUserResult = await prisma.user.create({
      data: {
        username: request.body.username,
        password: request.body.password,
      },
    });
    reply.send(createUserResult);
  },
  find: async (
    request: FastifyRequest<{ Body: userZodSchemaType }>,
    reply: FastifyReply
  ) => {
    const findUserResult = await prisma.user.findUnique({
      where: {
        username: request.body.username,
        password: request.body.password,
      },
    });
    reply.send(findUserResult);
  },
};
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
