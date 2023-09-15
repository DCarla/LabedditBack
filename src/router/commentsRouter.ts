import express from "express";

import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";
import { UserDatabase } from "../database/UserDatabase";
import { CommentController } from "../controller/CommentsController";
import { CommentBusiness } from "../businness/CommentsBusiness";
import { CommentDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/Postdatabase";

export const commentRouter = express.Router();

const commentController = new CommentController(
  new CommentBusiness(
    new UserDatabase(),
    new CommentDatabase(),
    new PostDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

commentRouter.get("/:id", commentController.getComments);
commentRouter.post("/:id", commentController.createComment);
commentRouter.put(
  "/:id/:commentId/like",
  commentController.likeOrDislikeComment
);
