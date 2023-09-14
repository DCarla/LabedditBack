import { Request, Response } from "express";
import { GetPostsSchema } from "../dtos/post/getPosts.dto";
import { PostBusinness } from "../businness/PostBusiness";
import { BaseError } from "../Errors/baseError";
import { ZodError } from "zod";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { LikeOrDislikePostSchema } from "../dtos/post/likeOrDislike.dto";

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

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        token: req.headers.authorization,
        content: req.body.content,
      });
      const output = await this.postBusiness.createPost(input);
      res.status(201).send(output);
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
  public likeOrDislike = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        token: req.headers.authorization,
        like: req.body.like,
        id: req.params.id,
      });
      const output = await this.postBusiness.likeOrDislikePost(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);
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
