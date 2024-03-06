import { z } from "zod";
import { jsonSchemaFromZod } from "@/utils/zodToJsonSchema";

export const productZodSchema = z.object({
  name: z.string().min(2).max(30),
  amount: z.number().int(),
  price: z.number().int(),
  customer: z.string().min(2).max(30),
  email: z.string().email(),
  phone: z.string().regex(/^\+380\d{9}$/),
  status: z.string()
});

export type productZodSchemaType = z.infer<typeof productZodSchema>;
export const productJsonSchema = jsonSchemaFromZod(
  productZodSchema,
  "productZodSchema"
);
