import { FastifyReply, FastifyRequest } from "fastify";

export const AuthMiddleware = (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply.clearCookie('username');

        const usernameCookie = request.cookies?.username;
        if (!usernameCookie)
            throw new AuthError("User not authenticated")

        reply.send("Auth")
        // request.auth = {}
    } catch (error) {
        const e = error as unknown as any
        if (e.name === "Error")
            reply.status(401).send({ message: e.message });

        if (e instanceof AuthError)
            reply.status(401).send({ message: "AuthError: " + e.message });

        // console.log(e.name)
        // console.log(e.message)
        // console.log(e.stack)
        // reply.status(401).send({ message: 'User not authenticated' });
    }

}

class SystemError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "SystemError"
        this.message = message
    }
}

class PrismaError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "PrismaError"
        this.message = message
    }
}

class AuthError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AuthError"
        this.message = message
    }
}
