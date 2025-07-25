import axios from 'axios';
import { env } from 'process';

// configuração da api
// pegando dados do dotenv para passar no headears
export const api = axios.create({
  baseURL: `${process.env.URL_API}`, // pegando a url da api pelas variaveis de ambiente
  headers: {
    'cnpj-sh': process.env.CNPJ_SH,
    'token-sh': process.env.TOKEN_SH,
    'cnpj-cedente': process.env.CNPJ_CEDENTE,
    'Content-Type': process.env.CONTENT_TYPE,
  },
});
