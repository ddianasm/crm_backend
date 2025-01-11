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
        if (e.code === "P2002") throw new AuthError("Username unavailable. Try another.")
      });

    if (!user) throw new AuthError("User not created")

    const userId = String(user.id);

    createSession(request, reply, userId)
    reply.send({ userId: user.id, message: 'Registration successful' });
  },


  signIn: async (request: FastifyRequest<{ Body: z.infer<typeof userSchema.zod> }>, reply: FastifyReply) => {
    const { username, password } = request.body

    const user = await prisma.user.findFirst({
      where: { username }
    });

    if (!user) throw new AuthError("The username or password is incorrect.")

    const userId = String(user.id);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new AuthError("The username or password is incorrect.");

    createSession(request, reply, userId)
    reply.send({ userId: user.id, message: 'Login successful!' });
  },


  isAuth: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ userId: request.user?.id, message: 'User authenticated' });
  },


  logout: async (request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie('username');
    reply.send({ message: 'Logout successful' });
  }
}
