import { Router } from "express";

import usersRouter from "./user";
import cardsRouter from "./cards";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/cards", cardsRouter);

export default routes;
