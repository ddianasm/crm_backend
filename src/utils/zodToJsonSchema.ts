import { ZodType } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const jsonSchemaFromZod = (zod: ZodType, id: string) => {
  const simpleSchema = zodToJsonSchema(zod, {
    name: id,
    $refStrategy: "none",
  }).definitions?.[id];
  return {
    schema: {
      $id: id,
      ...simpleSchema,
    },
    $ref: { $ref: `${id}#` },
  };
};
