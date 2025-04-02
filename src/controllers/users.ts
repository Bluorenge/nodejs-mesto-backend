import { Request, Response } from "express";

import UserModel from "../models/user";

// Получение всех пользователей
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err: any) {
    res.status(500).send({
      message: "Произошла ошибка при получении пользователей",
      error: err.message,
    });
  }
};

// Создание нового пользователя
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await UserModel.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: "Переданы некорректные данные при создании пользователя",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при создании пользователя",
        error: err.message,
      });
    }
  }
};

// Получение пользователя по ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: "Пользователь с указанным ID не найден" });
    }

    res.send(user);
  } catch (err: any) {
    if (err.name === "CastError") {
      res.status(400).send({
        message: "Передан некорректный ID пользователя",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при получении пользователя",
        error: err.message,
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, about } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: "Переданы некорректные данные при обновлении пользователя",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при обновлении пользователя",
        error: err.message,
      });
    }
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.user?._id,
      { avatar },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: "Переданы некорректные данные при обновлении аватара",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Произошла ошибка при обновлении аватара",
        error: err.message,
      });
    }
  }
};
