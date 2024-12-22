import { FastifyPluginCallback } from "fastify";
import { ProductController } from "@/product/product.controller";
import { productJsonSchema } from "@/product/product.zod.schema";
import { AuthMiddleware } from "@/auth/auth.middleware";

export const ProductRoutes: FastifyPluginCallback = async (server, opts, done) => {

    server.route({
        url: "/products/get",
        method: "GET",
        preHandler: [AuthMiddleware],
        handler: ProductController.getProducts,
    })

    server.route({
        url: "/products/add",
        method: "POST",
        schema: {
            body: productJsonSchema.$ref,
        },
        preHandler: [AuthMiddleware],
        handler: ProductController.add,
    })

    server.route({
        url: "/products/delete",
        method: "POST",
        schema: {
            body: {
                type: 'array',
                items: { type: 'number' }
            }
        },
        preHandler: [AuthMiddleware],
        handler: ProductController.delete
    })

    done();
};
