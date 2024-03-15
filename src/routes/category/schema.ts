import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Required!" }),
  description: z.string().min(1, { message: "Required!" }),
});
