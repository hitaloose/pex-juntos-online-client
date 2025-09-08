import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(1),
  passwordConfirmation: z.string().min(1),
  phoneWhatsapp: z.string().min(1),
  neighborhood: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});
