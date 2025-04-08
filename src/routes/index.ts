import { Router } from 'express';

import usersRouter from './user';
import cardsRouter from './cards';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (_req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

export default routes;
