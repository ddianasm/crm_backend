import { FastifyPluginCallback } from "fastify";
import { ProductController } from "@/product/product.controller";
import { productJsonSchema } from "@/product/product.zod.schema";

export const ProductRoutes: FastifyPluginCallback = async (server, opts, done) => {
    server.route({
        url: "/add",
        method: "POST",
        schema: {
            body: productJsonSchema.$ref,
        },
        handler: ProductController.create,
    })

    done();
};
