import { NextFunction, Request, Response } from "express";

import UserModel from "../models/user";
import { StatusCode } from "../constants/status-codes";
import { HttpError } from "../errors/http-error";

// Получение всех пользователей
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find({});

    res.status(StatusCode.OK).send(users);
  } catch (err: any) {
    next(err);
  }
};

// Создание нового пользователя
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await UserModel.create({ name, about, avatar });
    res.status(StatusCode.CREATED).status(StatusCode.CREATED).send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      next(
        new HttpError(
          "Переданы некорректные данные при создании пользователя",
          StatusCode.BAD_REQUEST
        )
      );
    } else {
      next(err);
    }
  }
};

// Получение пользователя по ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new HttpError(
        "Пользователь с указанным ID не найден",
        StatusCode.NOT_FOUND
      );
    }

    res.status(StatusCode.OK).send(user);
  } catch (err: any) {
    if (err.name === "CastError") {
      next(
        new HttpError(
          "Передан некорректный ID пользователя",
          StatusCode.BAD_REQUEST
        )
      );
    } else {
      next(err);
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, about } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new HttpError(
        "Пользователь с указанным ID не найден",
        StatusCode.NOT_FOUND
      );
    }

    res.status(StatusCode.OK).send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      next(
        new HttpError(
          "Переданы некорректные данные при обновлении пользователя",
          StatusCode.BAD_REQUEST
        )
      );
    } else {
      next(err);
    }
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { avatar } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.user?._id,
      { avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new HttpError(
        "Пользователь с указанным ID не найден",
        StatusCode.NOT_FOUND
      );
    }

    res.status(StatusCode.OK).send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      next(
        new HttpError(
          "Переданы некорректные данные при обновлении аватара",
          StatusCode.BAD_REQUEST
        )
      );
    } else {
      next(err);
    }
  }
};
