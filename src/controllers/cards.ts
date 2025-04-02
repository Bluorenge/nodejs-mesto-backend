import { Request, Response } from "express";

import CardModel from "../models/card";

// Получение всех карточек
export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await CardModel.find({});
    res.send(cards);
  } catch (err: any) {
    res.status(500).send({
      message: "Произошла ошибка при получении карточек",
      error: err.message,
    });
  }
};

// Создание новой карточки
export const createCard = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body;

    const card = await CardModel.create({ name, link });
    res.status(201).send(card);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: "Переданы некорректные данные при создании карточки",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при создании карточки",
        error: err.message,
      });
    }
  }
};

// Удаление карточки по ID
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const card = await CardModel.findByIdAndDelete(cardId);

    if (!card) {
      return res
        .status(404)
        .send({ message: "Карточка с указанным ID не найдена" });
    }

    res.send({ message: "Карточка успешно удалена", data: card });
  } catch (err: any) {
    if (err.name === "CastError") {
      res.status(400).send({
        message: "Передан некорректный ID карточки",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при удалении карточки",
        error: err.message,
      });
    }
  }
};

export const setCardLike = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { new: true }
    );
    res.send(card);
  } catch (err: any) {
    if (err.name === "CastError") {
      res.status(400).send({
        message: "Передан некорректный ID карточки",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при лайке карточки",
        error: err.message,
      });
    }
  }
};
