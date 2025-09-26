import z from "zod";

export const adSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.custom<File>().optional(),
});

export const searchAdsSchema = z.object({
  q: z.string().optional().default(""),
  category: z.string().optional().default(""),
  neighborhood: z.string().optional().default(""),
});
