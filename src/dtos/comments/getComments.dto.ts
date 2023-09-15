import { z } from "zod";
import { CommentModel } from "../../models/Comments";

export interface GetCommentsInputDTO {
  postId: string;
  token: string;
}

export type GetCommentsOutputDTO = CommentModel[];

export const getCommentSchema = z
  .object({
    postId: z.string(),
    token: z.string(),
  })
  .transform((data) => data as GetCommentsInputDTO);
