import axios, { AxiosError } from 'axios';

// Função para lidar com erros do Axios
export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // O erro é uma instância de AxiosError
    console.error('Erro ao buscar dados da API:', error.response?.data);
    console.error('Status do erro:', error.response?.status);
    console.error('Headers do erro:', error.response?.headers);
  } else if (error instanceof Error) {
    //erro geral
    console.error('Erro ao configurar a requisição:', error.message);
  } else {
    // Alguma outra coisa aconteceu
    console.error('Erro desconhecido:', error);
  }
};
