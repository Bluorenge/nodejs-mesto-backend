import express from "express";

import mongoose from "mongoose";

import { userMiddleware } from "./middlewares/user";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";

// Слушаем 3000 порт
const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } = process.env;

const app = express();

// подключаемся к серверу MongoDB
mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(userMiddleware);

app.use("/", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
