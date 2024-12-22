import { FastifyReply, FastifyRequest } from "fastify";
import { AuthError } from "@/utils/errors";
import bcrypt from "bcrypt"
import { createSession } from "@/auth/auth.service";
import { prisma } from "@/utils/prisma";
import { z } from "zod";
import userSchema from "@/auth/auth.zod.schema"


export const UserController = {

  signUp: async (request: FastifyRequest<{ Body: z.infer<typeof userSchema.zod> }>, reply: FastifyReply) => {
    let { username, password } = request.body
    password = await bcrypt.hash(password, 10)

    const user = await prisma.user
      .create({
        data: { username, password }
      })
      .catch(e => {
        if (e.code === "P2002") throw new AuthError("Username must be unique")
      });

    if (!user) throw new AuthError("User not created")

    // Користувача успішно створено, відправляється відповідь
    createSession(request, reply)
    reply.send({ username: user.username, message: 'Registration successful' });
  },


  signIn: async (request: FastifyRequest<{ Body: z.infer<typeof userSchema.zod> }>, reply: FastifyReply) => {
    const { username, password } = request.body
    const user = await prisma.user.findFirst({
      where: { username }
    });
    if (!user) throw new AuthError("User not found")
    if (!bcrypt.compare(password, user.password)) throw new AuthError("The username or password is incorrect.")

    // Користувач авторизований, відправляється відповідь
    createSession(request, reply)
    reply.send({ username: user.username, message: 'Login successful!' });
  },


  isAuth: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ username: request.user?.username, message: 'User authenticated' });
  },


  logout: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie('username');
    reply.send({ message: 'Logout successful' });
  }
}
