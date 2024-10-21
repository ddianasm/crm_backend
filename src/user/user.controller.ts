import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { userZodSchemaType } from "@/user/user.zod.schema";

const prisma = new PrismaClient();

export const UserController = {
  signUp: async (
    request: FastifyRequest<{ Body: userZodSchemaType }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await prisma.user.create({
        data: {
          username: request.body.username,
          password: request.body.password,
        },
      });
      reply.setCookie("username", request.body.username, {
        maxAge: 86400000,
        path: "/",
        httpOnly: true,
      });
      reply.status(200).send({ username: user.username, message: 'Registration successful' });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Registration error:', error.message);
        reply.status(500).send({ message: 'Error during registration', error: error.message });
      } else {
        reply.status(500).send({ message: 'Unknown error occurred during registration' });
      }
    }
  },
  signIn: async (
    request: FastifyRequest<{ Body: userZodSchemaType }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: request.body.username,
        },
      });

      if (user) {
        reply.setCookie("username", request.body.username, {
          maxAge: 86400000,
          path: "/",
          httpOnly: true,
        });
        reply.status(200).send({ username: user.username, message: 'Login successful!' });
      } else {
        reply.status(401).send({ message: 'User not authenticated' });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
        reply.status(500).send({ message: 'Error during login', error: error.message });
      } else {
        reply.status(500).send({ message: 'Unknown error occurred during login' });
      }
    }
  },
  isAuth: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const usernameCookie = request.cookies?.username;
      if (usernameCookie) {
        reply.status(200).send({ username: usernameCookie, message: 'User authenticated' });
      } else {
        reply.status(401).send({ message: 'User not authenticated' });
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      reply.status(500).send({ message: 'Internal server error' });
    }
  },
  logout: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.clearCookie('username');
      reply.status(200).send({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      reply.status(500).send({ message: 'Logout failed' });
    }
  }
}
