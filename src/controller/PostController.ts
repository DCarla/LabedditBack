import { Request, Response } from "express";
import { GetPostsSchema } from "../dtos/post/getPosts.dto";
import { PostBusinness } from "../businness/PostBusiness";
import { BaseError } from "../Errors/baseError";
import { ZodError } from "zod";

export class PostController {
  constructor(private postBusiness: PostBusinness) {}

  public getPost = async (req: Request, res: Response) => {
    try {
      const input = GetPostsSchema.parse({
        token: req.headers.authorization,
      });
      const output = await this.postBusiness.getPosts(input);
      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };
}
