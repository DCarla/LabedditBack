import { Request, Response } from "express";
import { BaseError } from "../Errors/baseError";
import { ZodError } from "zod";

import { CommentBusiness } from "../businness/CommentsBusiness";
import { getCommentSchema } from "../dtos/comments/getComments.dto";
import { createCommentSchema } from "../dtos/comments/createComments.dto";
import { likeDislikeCommentSchema } from "../dtos/comments/likeDislikeComment.dto";

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}
  public getComments = async (req: Request, res: Response) => {
    try {
      const input = getCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
      });
      const output = await this.commentBusiness.getComments(input);
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

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = createCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        content: req.body.content,
      });
      const output = await this.commentBusiness.createComment(input);
      res.status(201).send(output);
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
  public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = likeDislikeCommentSchema.parse({
        token: req.headers.authorization,
        like: req.body.like,
        postId: req.params.id,
        commentId: req.params.commentId,
      });

      const output = await this.commentBusiness.likeOrDislikeComment(input);
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
