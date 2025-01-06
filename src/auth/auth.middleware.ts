import { AuthError } from "@/utils/errors";
import { prisma } from "@/utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export const AuthMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.cookies;

    if (!userId) throw new AuthError("Session not found")

    const id: number = Number(userId);

    const user = await prisma.user.findFirst({
        where: { id }
    });
    if (!user) throw new AuthError("User not found")

    request.user = user
}