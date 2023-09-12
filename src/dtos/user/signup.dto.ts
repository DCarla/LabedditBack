import z from "zod";
export interface signupInputDTO {
  nickname: string;
  email: string;
  password: string;
}

export interface signupOutputDTO {
  message: string;
  token: string;
}

export const signupSchema = z
  .object({
    nickname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .transform((data) => data as signupInputDTO);
