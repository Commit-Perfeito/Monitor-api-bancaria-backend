import { api } from '../../../../config/api/api';
import { ApiBodyInterface } from '../../domain/interfaces/ApiBodyInterface';
import { CedenteInterface } from '../../domain/interfaces/CedenteInterface';
import { handleApiError } from '../../utils/handleApiError';

export class ConsultaBoletoService {
  async execute(cedente: CedenteInterface): Promise<ApiBodyInterface> {
    const start = performance.now();
    const { ID_INTEGRACAO } = cedente;

    try {
      const response = await api.get(
        `/v1/boletos?idintegracao=${ID_INTEGRACAO}`
      );
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
  }
}
