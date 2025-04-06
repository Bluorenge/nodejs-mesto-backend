// Расширяем интерфейс Request для добавления свойства user
export {};

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string };
    }
  }
}
