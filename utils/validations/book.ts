import { z } from "zod";

export const bookFormSchema = z.object({
  bookID: z.string().min(1, { message: "Book ID is required" }),
});

export type BookFormFieldValues = z.infer<typeof bookFormSchema>;
