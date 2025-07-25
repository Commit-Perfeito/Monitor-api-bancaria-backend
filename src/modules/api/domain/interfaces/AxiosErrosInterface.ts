export interface AxiosError {
  response?: {
    status: number;
    data: any;
  };
  code?: string;
}