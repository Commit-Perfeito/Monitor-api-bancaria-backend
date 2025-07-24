export enum PositiveCodeRequest {
  SUCESSO = 200, // Sucesso
  REQUISICAO_INCORRETA = 400, // Requisição inválida
  NAO_AUTORIZADO = 401, // Não autorizado
  PROIBIDO = 403, // Proibido
  NAO_PROCESSADO = 422, // Não processado
}
