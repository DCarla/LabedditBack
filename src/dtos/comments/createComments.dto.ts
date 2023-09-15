import z from "zod";

export interface CreateCommentInputDTO {
  postId: string;
  content: string;
  token: string;
}

export type CreateCommentOutputDTO = undefined;

export const createCommentSchema = z
  .object({
    postId: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(1),
  })
  .transform((data) => data as CreateCommentInputDTO);
