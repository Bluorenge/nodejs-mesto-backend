import { Request, Response, NextFunction } from "express";

// Расширяем интерфейс Request для добавления свойства user
declare global {
  namespace Express {
    interface Request {
      user?: { _id: string };
    }
  }
}

// Middleware для добавления пользователя к запросу
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = {
    _id: "67e5df9e4fc78beebaec5711", // ID пользователя
  };
  next();
};
