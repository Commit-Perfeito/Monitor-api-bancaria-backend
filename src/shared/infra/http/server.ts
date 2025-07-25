import 'reflect-metadata';
import express from 'express';
import '../../container/index';
import 'dotenv/config';
import '@shared/utils/Translations';
import cors from 'cors'; // lib para api ficar livre ao front
import { AppDataSource } from '../typeorm/data-source';
import { handleAxiosError } from '@shared/errors/ErrorAxios'; // erros
import { ReqAll } from '@modules/api/services/RequestAll'; // função que percorre lista e faz consulta na tecnospeed
import { router } from '@shared/infra/http/routes/index.routes';
import rateLimiter from '@shared/infra/http/middleware/RateLimiter';

export const server = express();

// Lista de bancos para percorrer no back-end atraves do .env
const lista: string[] = process.env.Lista_Bancos?.split(',') || [];
const fetchData = async () => {
  try {
    await ReqAll(lista); // Aguarda a resolução da função
  } catch (error) {
    console.error('Erro ao buscar dados:', error); // Captura e exibe erros se ocorrerem
    handleAxiosError(error);
  }
};

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
      fetchData();
      // setInterval(fetchData, 300000);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
