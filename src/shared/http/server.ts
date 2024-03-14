import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

// CONECTAR O USO DE ROTAS
app.use(cors());

// CONFIGURAR PRA TRABALHAR A API SOMENTE COM JSON
app.use(express.json());

app.use(routes);

// MIDDLEWARE DE TRATAMENTO DE ERROS
app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
      });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})