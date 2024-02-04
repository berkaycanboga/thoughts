import { z } from "zod";

export const PostSchema = z.object({
  postContent: z
    .string()
    .min(1, "Please enter some text.")
    .max(
      190,
      "Oops! You've exceeded the maximum character limit. Please shorten your post.",
    ),
});

export type PostValidation = z.infer<typeof PostSchema>;
