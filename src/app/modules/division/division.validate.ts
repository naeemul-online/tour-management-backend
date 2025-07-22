import { z } from "zod";

export const createDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string." })
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters."),

  slug: z
    .string({ invalid_type_error: "Slug must be a string." })
    .min(2, "Slug must be at least 2 characters long.")
    .max(100, "Slug cannot exceed 100 characters.")
    .optional(),

  thumbnail: z
    .string({ invalid_type_error: "Thumbnail must be a string." })
    .url("Thumbnail must be a valid URL.")
    .optional(),

  description: z
    .string({ invalid_type_error: "Description must be a string." })
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
});
