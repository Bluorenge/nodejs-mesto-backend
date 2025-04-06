import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserAvatar,
  updateUser,
} from "../controllers/users";

const usersRouter = Router();

usersRouter.post("/users", createUser);
usersRouter.get("/users", getAllUsers);
usersRouter.get("/users/:userId", getUserById);

usersRouter.patch("/users/me", updateUser);
usersRouter.patch("/users/me/avatar", updateUserAvatar);

export default usersRouter;
