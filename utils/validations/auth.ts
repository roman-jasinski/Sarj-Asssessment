import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type AuthFormFieldValues = z.infer<typeof authFormSchema>;
