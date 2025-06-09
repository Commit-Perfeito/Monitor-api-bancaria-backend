import { api } from '../api';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { CedenteInterface } from '../interfaces/CedenteInterface';
import { handleApiError } from '../service/handleApiError';

export const ConsultaBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  const start = performance.now();
  const { ID_INTEGRACAO } = cedente;

  try {
    const response = await api.get(`/v1/boletos?idintegracao=${ID_INTEGRACAO}`);
    const tempoReq = (performance.now() - start).toFixed();

    return {
      TempoReq: tempoReq,
      type: 'consulta',
      codeResponse: response.status,
      message: `${response.status}: requisição feita, API online.`,
      payload: response.data,
    };
  } catch (error) {
    return handleApiError(error, start, 'consulta');
  }
};
