import { injectable, inject } from "tsyringe";

import AppError from '../errors/AppError';

import PortifolioModel from '../models/PortifolioModel';
import IPortifolioRepository from "../repositories/IPortifolioRepository";

interface IRequest {
  provider_id: string;
  symbol: string;
  name: string;
}

@injectable()
class CreatePortfolioService {
  constructor(
    @inject("PortifolioRepository")
    private portifolioRepository: IPortifolioRepository,
  ) { }

  public async execute({ provider_id, symbol, name }: IRequest): Promise<PortifolioModel> {
    const findProvider = await this.portifolioRepository.findByProvider(provider_id);

    if (findProvider) {
      throw new AppError('Já existe um Portfólio cadastrado com esse nome!!', 401)
    }
    const portifolio = await this.portifolioRepository.create({ provider_id, symbol, name });

    return portifolio;
  }
};

export default CreatePortfolioService;

