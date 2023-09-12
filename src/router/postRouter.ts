import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusinness } from "../businness/PostBusiness";
import { PostDatabase } from "../database/Postdatabase";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { HashManager } from "../services/hashManager";
import { TokenManager } from "../services/tokenManager";

export const postRouter = express.Router();
const postController = new PostController(
  new PostBusinness(
    new PostDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
  )
);
postRouter.get("/", postController.getPost);
