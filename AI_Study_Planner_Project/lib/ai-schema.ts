import { z } from "zod";

export const planSchema = z.object({
  schedule: z.array(z.object({
    date: z.string(),
    sessions: z.array(z.object({
      subject: z.string(),
      topic: z.string(),
      duration: z.number().positive(),
      priority: z.enum(["low", "medium", "high"])
    }))
  }))
});
