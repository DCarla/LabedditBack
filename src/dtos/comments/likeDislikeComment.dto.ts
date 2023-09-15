import z from "zod";

export interface LikeOrDislikeCommentInputDTO {
  postId: string;
  commentId: string;
  like: boolean;
  token: string;
}

export type likeDislikeCommentOutputDTO = undefined;

export const likeDislikeCommentSchema = z
  .object({
    postId: z.string().min(1),
    like: z.boolean(),
    token: z.string().min(1),
    commentId: z.string(),
  })
  .transform((data) => data as LikeOrDislikeCommentInputDTO);
