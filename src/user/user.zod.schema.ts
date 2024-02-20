import { z } from "zod";
import { jsonSchemaFromZod } from "@/utils/zodToJsonSchema";

export const userZodSchema = z.object({
  username: z.string().min(2).max(10),
  password: z.string().min(8).max(50),
});

export type userZodSchemaType = z.infer<typeof userZodSchema>;
export const userJsonSchema = jsonSchemaFromZod(userZodSchema, "userZodSchema");
