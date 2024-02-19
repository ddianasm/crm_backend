import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

export const UserController = {
  create: async (
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
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
