import express from "express";
import dotenv from "dotenv";
import cors from "cors";
 dotenv.config();

import bearerToken from 'express-bearer-token'


import userRouter from "./modules/user/user.route.js";
import authRouter from "./modules/auth/auth.route.js"

const app = express();
app.use(bearerToken());
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/health", (_, res) => {
  return res.send("Servidor rodando, ok");
});

app.listen(8080, async () => {
  console.log("listening on");
});
