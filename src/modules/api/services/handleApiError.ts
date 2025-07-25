import { PositiveCodeRequest } from '../models/enums/PositiveCodeRequest';
import { ApiBodyInterface } from '../models/interfaces/ApiBodyInterface';

interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
  code?: string;
}

export const handleApiError = (
  error: any,
  startTime: number,
  type: string
): ApiBodyInterface => {
  const tempoReq = (performance.now() - startTime).toFixed();
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    const { status, data } = axiosError.response;

    const isPositiveCode = Object.values(PositiveCodeRequest).includes(status);

    return {
      TempoReq: tempoReq,
      type,
      codeResponse: status,
      message: `[${status}] ${isPositiveCode
        ? 'Requisição feita, API online, mas ocorreu um problema.'
        : 'Ocorreu um problema na requisição, API offline.'
        }`,
      payload: data,
    };
  }

  console.error('Erro inesperado ao registrar boleto:', error);

  let codeResponse = 0;
  switch (error.code) {
    case 'ECONNREFUSED':
      codeResponse = 111;
      break;
    case 'ECONNRESET':
      codeResponse = 104;
      break;
    case 'ENOTFOUND':
      codeResponse = 3008;
      break;
  }

  return {
    TempoReq: tempoReq,
    type,
    codeResponse,
    message: `Erro inesperado ao realizar ${type}.`,
    payload: error instanceof Error ? error.message : error,
  };
};
