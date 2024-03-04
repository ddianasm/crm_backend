import { z } from "zod";
import { jsonSchemaFromZod } from "@/utils/zodToJsonSchema";

export const productZodSchema = z.object({
  name: z.string().min(2).max(20),
});

export type productZodSchemaType = z.infer<typeof productZodSchema>;
export const productJsonSchema = jsonSchemaFromZod(
  productZodSchema,
  "productZodSchema"
);
