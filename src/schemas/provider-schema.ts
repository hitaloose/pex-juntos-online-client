import z from "zod";

export const providerSchema = z.object({
  name: z.string(),
  phoneWhatsapp: z.string().min(11).max(11),
  neighborhood: z.string(),
  image: z.custom<File>().optional(),
});
