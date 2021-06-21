import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import PortifolioModel from "../models/PortifolioModel";
import { getRepository, Repository, Not } from "typeorm";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

import IPortifolioRepository from "./IPortifolioRepository";



class PortifolioRepository implements IPortifolioRepository {
  private ormRepository: Repository<PortifolioModel>;

  constructor() {
    this.ormRepository = getRepository(PortifolioModel);
  }

  public async findByProvider(name: string): Promise<PortifolioModel | undefined> {
    const portifolio = await this.ormRepository.findOne({
      where: { name },
    });

    return portifolio;
  }

  public async findAllProviders({
    expect_user_id,
  }: IFindAllProvidersDTO): Promise<PortifolioModel[]> {
    let portifolio: PortifolioModel[];

    if (expect_user_id) {
      portifolio = await this.ormRepository.find({
        where: {
          codigo: Not(expect_user_id),
        },
      });
    } else {
      portifolio = await this.ormRepository.find();
    }

    return portifolio;
  }

  public async create(userData: ICreateAppointmentDTO): Promise<PortifolioModel> {
    const portifolio = this.ormRepository.create(userData);

    await this.ormRepository.save(portifolio);

    return portifolio;
  }

  public async save(user: PortifolioModel): Promise<PortifolioModel> {
    return this.ormRepository.save(user);
  }
}

export default PortifolioRepository;
