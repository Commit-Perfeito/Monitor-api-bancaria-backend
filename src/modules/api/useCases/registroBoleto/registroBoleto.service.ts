import { api } from '../../../../config/api/api';
import { ApiBodyInterface } from '../../domain/interfaces/ApiBodyInterface';
import { CedenteInterface } from '../../domain/interfaces/CedenteInterface';
import { handleApiError } from '../../utils/handleApiError';
import { BodyDefault } from '../../infra/http/request/registro/BodyDefault';

export class RegistroBoletoService {
  async execute(cedente: CedenteInterface): Promise<ApiBodyInterface> {
    const dadosCedentes = {
      CedenteContaNumero: cedente.CEDENTE_CONTA_NUMERO,
      CedenteContaNumeroDV: cedente.CEDENTE_CONTA_NUMERO_DV,
      CedenteConvenioNumero: cedente.CEDENTE_CONVENIO_NUMERO,
      CedenteContaCodigoBanco: cedente.CEDENTE_CONTA_CODIGO_BANCO,
    };

    const start = performance.now();
    const requestBody = {
      ...BodyDefault,
      ...dadosCedentes,
    };

    try {
      const response = await api.post(`/v1/boletos`, requestBody);
      const end = performance.now();
      const ReqTime = (end - start).toFixed();
      const payload = response.data;

      return {
        TempoReq: ReqTime,
        type: 'registro',
        codeResponse: response.status,
        message: `${response.status}: requisição feita, API online.`,
        payload,
      };
    } catch (error) {
      return handleApiError(error, start, 'registro');
    }
  }
}
