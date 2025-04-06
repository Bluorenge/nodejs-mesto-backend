import { Request, Response, NextFunction } from 'express';

// Middleware для добавления пользователя к запросу
const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.user = {
    _id: '67f2993d7377d290d2ac3095', // ID пользователя
  };
  next();
};

export default userMiddleware;
