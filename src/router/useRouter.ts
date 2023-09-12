import express from "express";

import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { HashManager } from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";
import { UserBusiness } from "../businness/UserBusiness";

export const userRouter = express.Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new TokenManager()
  )
);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
