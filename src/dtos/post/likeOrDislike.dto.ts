import z from "zod";

export interface LikeOrDislikePostInputDTO {
  id: string;
  token: string;
  like: boolean;
}

export type LikeOrDislikePostOutputDTO = undefined;

export const LikeOrDislikePostSchema = z
  .object({
    id: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean(),
  })
  .transform((data) => data as LikeOrDislikePostInputDTO);
