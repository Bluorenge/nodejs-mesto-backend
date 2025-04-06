import { Router } from "express";

import {
  createCard,
  deleteCard,
  getCards,
  setCardLike,
} from "../controllers/cards";

const cardsRouter = Router();

cardsRouter.post("/cards", createCard);
cardsRouter.get("/cards", getCards);
cardsRouter.put("/cards/:cardId/likes", setCardLike);
cardsRouter.delete("/cards/:cardId", deleteCard);

export default cardsRouter;
