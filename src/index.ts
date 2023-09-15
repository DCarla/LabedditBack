import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./router/useRouter";
import { PostController } from "./controller/PostController";
import { postRouter } from "./router/postRouter";
import { commentRouter } from "./router/commentsRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(Number(process.env.PORT || 3003), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Funciona! ");
});

app.use("/users", userRouter);

app.use("/posts", postRouter);
app.use("/comments", commentRouter);
