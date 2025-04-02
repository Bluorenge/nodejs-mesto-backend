import { Router } from "express";

import { createUser, getAllUsers, getUserById, updateUserAvatar, updateUser } from "../controllers/users";
import { createCard, deleteCard, getCards, setCardLike } from "../controllers/cards";

const routes = Router();

routes.post("/users", createUser);
routes.get("/users", getAllUsers);
routes.get("/users/:userId", getUserById);

routes.patch("/users/me", updateUser);
routes.patch("/users/me/avatar", updateUserAvatar);

routes.post("/cards", createCard);
routes.get("/cards", getCards);
routes.put("/cards/:cardId/likes", setCardLike)
routes.delete("/cards/:cardId", deleteCard);



export default routes;
