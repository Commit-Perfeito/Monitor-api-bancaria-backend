export interface ApiBodyInterface {
  TempoReq: string; // Tempo da requisição
  type: string; // tipo do boleto
  codeResponse: number; // Código de resposta
  payload?: any; // Dados do boleto (opcional)
  message?: string; // Mensagem em caso de erro (opcional)
  details?: any; // Detalhes do erro (opcional)
  erro?: boolean;
}
