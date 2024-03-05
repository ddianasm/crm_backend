import { FastifyPluginCallback } from "fastify";
import { ProductController } from "@/product/product.controller";
import { productJsonSchema } from "@/product/product.zod.schema";

export const ProductRoutes: FastifyPluginCallback = async (server, opts, done) => {
    server.route({
        url: "/add_product",
        method: "POST",
        schema: {
            body: productJsonSchema.$ref,
        },
        handler: ProductController.create,
    })

    server.route({
        url: "/get_products",
        method: "GET",
        handler: ProductController.getProducts,
    })
    done();
};
