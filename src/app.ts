import express, { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";

import routes from "./routes/routes";
import { userMiddleware } from "./middlewares/user";

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу MongoDB
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use(userMiddleware);
app.use("/", routes);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
