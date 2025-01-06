import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import userSchema from "@/auth/auth.zod.schema"


export const createSession = (request: FastifyRequest<{ Body: z.infer<typeof userSchema.zod> }>, reply: FastifyReply, userId: string) => {
    reply.setCookie("userId", userId, {
        maxAge: 86400000,
        path: "/",
        httpOnly: true,
    });
}