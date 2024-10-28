import { FastifyPluginCallback } from "fastify";
import { ProductController } from "@/product/product.controller";
import { productJsonSchema } from "@/product/product.zod.schema";

export const ProductRoutes: FastifyPluginCallback = async (server, opts, done) => {
    server.route({
        url: "/add-product",
        method: "POST",
        schema: {
            body: productJsonSchema.$ref,
        },
        handler: ProductController.add,
    })

    server.route({
        url: "/products",
        method: "GET",
        handler: ProductController.getProducts,
    })

    server.route({
        url: "/delete-products",
        method: "POST",
        schema: {
            body: {
                type: 'array',
                items: { type: 'number' }
            }
        },
        handler: ProductController.delete
    })
    server.route({
        url: "/columns",
        method: "GET",
        handler: ProductController.getColumns,
    })
    done();
};
