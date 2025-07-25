
// Parâmetros do erro de API

import { api } from "../../../config/api/api";
import { ApiBodyInterface } from "../domain/interfaces/ApiBodyInterface";
import { CedenteInterface } from "../domain/interfaces/CedenteInterface";
import { handleApiError } from "../utils/handleApiError";
import { BodyDefault } from "../infra/http/request/registro/BodyDefault";


// Função para realizar o registro de boleto no plugboleto
export default class RegistroBoletoService {
  async execute(
    cedente: CedenteInterface
  ): Promise<ApiBodyInterface> {


    const dadosCedentes = {
      CedenteContaNumero: cedente.CEDENTE_CONTA_NUMERO,
      CedenteContaNumeroDV: cedente.CEDENTE_CONTA_NUMERO_DV,
      CedenteConvenioNumero: cedente.CEDENTE_CONVENIO_NUMERO,
      CedenteContaCodigoBanco: cedente.CEDENTE_CONTA_CODIGO_BANCO,
    };

    const start = performance.now(); // Captura o tempo inicial
    const requestBody = {
      ...BodyDefault, // BodyDefault definido
      ...dadosCedentes, // Adiciona dados do cedente ao requestBody
    };

    try {
      const response = await api.post(`/v1/boletos`, requestBody); // Realiza a requisição de POST
      const end = performance.now(); // Captura o tempo final
      const ReqTime = (end - start).toFixed(); // Tempo de resposta
      const payload = response.data;

      return {
        TempoReq: ReqTime,
        type: 'registro',
        codeResponse: response.status,
        message: `${response.status}: requisição feita, API online.`,
        payload,
      };
    } catch (error) {
      // Função para tratar erros da API
      return handleApiError(error, start, 'registro');
    }
  }
}