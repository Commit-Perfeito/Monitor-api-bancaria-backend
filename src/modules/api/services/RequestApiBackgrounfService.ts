import RequestAllService from "./RequestAllService";
import { handleAxiosError } from "@shared/errors/ErrorAxios";
import { injectable, inject } from "tsyringe";

@injectable()
export default class RequestbackgroundAPIService {
  private list: string[] = process.env.Lista_Bancos?.split(',') || [];

  constructor(
    @inject("RequestAllService")
    private requestAllService: RequestAllService,
  ) { }

  async execute() {
    try {
      await this.requestAllService.execute(this.list);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      handleAxiosError(error);
    }
  }
}