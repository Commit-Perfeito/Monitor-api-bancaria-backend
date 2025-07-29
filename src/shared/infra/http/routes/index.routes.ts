import { Router } from 'express'; // router do express
import swaggerUI from 'swagger-ui-express'; // swagger
import path from 'path';
import 'dotenv/config'; // Importando variáveis de ambiente
import { recordRouter } from '@modules/Record/infra/http/routes/Record.routes';
import { BankRouter } from '@modules/Bank/infra/infra/routes/Bank.routes';

export const router = Router();

let path_swagger;
// verificação se o projeto é de produção ou desenvolvimento, e com base nisso, achar o swagger
if (process.env.NODE_ENV === 'production') {
  path_swagger = '/docs/swagger.js';
} else {
  path_swagger = '../../../../docs/swagger.json';
}
const swaggerFilePath = path.join(__dirname, path_swagger); // caminho do swagger

// rota da documentação
router.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(require(swaggerFilePath))
);

router.get('/', (_, res) => {
  return res.send('Olá, dev!');
});

router.use('/boleto', recordRouter);
router.use('/banco', BankRouter);
