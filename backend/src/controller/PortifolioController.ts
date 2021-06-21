import { Request, Response } from "express";
import { container } from "tsyringe";
import CreatePortfolioService from "../services/CreatePortfolioService";


export default class PortifolioController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, symbol, name } = req.body;
    const createPortfolioService = container.resolve(CreatePortfolioService);

    const portifolio = await createPortfolioService.execute({ provider_id, symbol, name });
    return res.json(portifolio);
  }
}
