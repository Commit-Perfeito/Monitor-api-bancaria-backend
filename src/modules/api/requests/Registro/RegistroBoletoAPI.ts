
// Parâmetros do erro de API

import { api } from "../../../../config/api/api";
import { ApiBodyInterface } from "../../models/interfaces/ApiBodyInterface";
import { CedenteInterface } from "../../models/interfaces/CedenteInterface";
import { handleApiError } from "../../services/handleApiError";
import { BodyDefault } from "./BodyDefault";

interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
}

// Função para realizar o registro de boleto no plugboleto
export const RegistroBoleto = async (
  cedente: CedenteInterface
): Promise<ApiBodyInterface> => {
  const DadosCedentes = {
    CedenteContaNumero: `${cedente.CEDENTE_CONTA_NUMERO}`,
    CedenteContaNumeroDV: `${cedente.CEDENTE_CONTA_NUMERO_DV}`,
    CedenteConvenioNumero: `${cedente.CEDENTE_CONVENIO_NUMERO}`,
    CedenteContaCodigoBanco: `${cedente.CEDENTE_CONTA_CODIGO_BANCO}`,
  };

  const start = performance.now(); // Captura o tempo inicial
  const requestBody = {
    ...BodyDefault, // BodyDefault definido
    ...DadosCedentes, // Adiciona dados do cedente ao requestBody
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
};
