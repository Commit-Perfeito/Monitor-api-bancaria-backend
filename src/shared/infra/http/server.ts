import 'reflect-metadata';
import express from 'express';
import '../../container/index';
import 'dotenv/config';
import '@shared/utils/Translations';
import cors from 'cors';
import rateLimiter from '@shared/infra/http/middleware/RateLimiter';
import RequestbackgroundAPIService from '@modules/api/services/RequestApiBackgrounfService';
import { container } from 'tsyringe';
import { AppDataSource } from '../typeorm/data-source';
import { router } from '@shared/infra/http/routes/index.routes';


export const server = express();
const Requestbackground = container.resolve(RequestbackgroundAPIService)

AppDataSource.initialize()
  .then(() => {

    server.use(cors());
    server.use(rateLimiter)
    server.use(express.json());
    server.use(router);

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(' ');
      console.log('************************');
      console.log(`Servidor rodando na porta ${port}`);
      Requestbackground.execute();
      setInterval(() => Requestbackground.execute(), 300000);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
