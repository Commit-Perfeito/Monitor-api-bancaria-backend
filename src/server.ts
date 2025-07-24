import 'reflect-metadata';
import express from 'express';
import './server/shared/container/index';
import 'dotenv/config';
import './server/shared/utils/Translations';
import cors from 'cors'; // lib para api ficar livre ao front
import { AppDataSource } from './data-source';
import { handleAxiosError } from './server/shared/errors/ErrorAxios'; // erros
import { ReqAll } from './server/modules/api/services/RequestAll'; // função que percorre lista e faz consulta na tecnospeed
import { router } from './server/shared/http/routes';

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
    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(router);

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(' ');
      console.log('************************');
      console.log(`Servidor rodando na porta ${port}`);
      // fetchData();
      // setInterval(fetchData, 300000);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
