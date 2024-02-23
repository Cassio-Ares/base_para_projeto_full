import express from "express";
import dotenv from "dotenv";
 dotenv.config();
import userRoute from "./modules/user/user.route.js";
const app = express();
app.use(express.json());

app.use("/users", userRoute);

app.get("/health", (_, res) => {
  return res.send("Servidor rodando, ok");
});

app.listen(8080, async () => {
  console.log("listening on");
});
