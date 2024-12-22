import { AuthError } from "@/utils/errors";
import { prisma } from "@/utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export const AuthMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username } = request.cookies;

    if (!username) throw new AuthError("Session not found")

    const user = await prisma.user.findFirst({
        where: { username }
    });
    if (!user) throw new AuthError("User not found")

    request.user = user
}