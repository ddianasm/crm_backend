import { z } from "zod";
import { jsonSchemaFromZod } from "@/utils/zodToJsonSchema";

export default new class userSchema {
  name = userSchema.name
  zod = z.object({
    username: z.string().min(2).max(20),
    password: z.string().min(8).max(20),
  })
  json = jsonSchemaFromZod(this.zod, this.name)
}