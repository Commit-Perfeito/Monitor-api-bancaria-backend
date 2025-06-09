import { HttpStatus } from '../../modules/Record/enums/HttpStatus';

// função para retonar código de resposta da requisição em detalhamento
export const getHttpStatusText = async (
  statusCode: number
): Promise<string> => {
  switch (statusCode) {
    case HttpStatus.ECONNRESET:
      return Promise.resolve('ECONNRESET');
    case HttpStatus.ECONNREFUSED:
      return Promise.resolve('ECONNREFUSED');
    case HttpStatus.Success:
      return Promise.resolve('Success');
    case HttpStatus.BadRequest:
      return Promise.resolve('Bad Request');
    case HttpStatus.Unauthorized:
      return Promise.resolve('Unauthorized');
    case HttpStatus.Forbidden:
      return Promise.resolve('Forbidden');
    case HttpStatus.UnprocessableEntity:
      return Promise.resolve('Unprocessable Entity');
    case HttpStatus.InternalServerError:
      return Promise.resolve('Internal Server Error');
    case HttpStatus.GatewayTimeout:
      return Promise.resolve('Gateway Timeout');
    default:
      return Promise.resolve('Unknown Status');
  }
};
