import { Router } from "express";

import {
  createCard,
  deleteCard,
  getCards,
  setCardLike,
} from "../controllers/cards";

const cardsRouter = Router();

cardsRouter.post("", createCard);
cardsRouter.get("", getCards);
cardsRouter.put("/:cardId/likes", setCardLike);
cardsRouter.delete("/:cardId", deleteCard);

export default cardsRouter;
