import { responseStatusType } from '../../modules/Record/enums/responseStatusType';

// função para saber o indicar de tempo de resposta
export const ConvertResponseStatus = async (
  responseTime: number,
  status: string
): Promise<string> => {
  if (status == 'ativo') {
    if (responseTime < 2000) {
      return responseStatusType.Normal; // Resposta normal
    } else if (responseTime >= 2000 && responseTime < 5000) {
      return responseStatusType.Lenta; // Resposta lenta
    } else if (responseTime >= 5000 && responseTime < 30000) {
      return responseStatusType.MuitoLenta; // Resposta um muito lenta
    } else {
      return responseStatusType.Timeout; // Excedeu o tempo limite
    }
  } else {
    return responseStatusType.Erro;
  }
};
