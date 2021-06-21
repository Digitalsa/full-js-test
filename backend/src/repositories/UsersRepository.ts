import { getRepository, Repository, Not } from "typeorm";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

import UsuarioModel from "../models/UsuarioModel";
import IUsersRepository from "./IUsersRepository";


class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<UsuarioModel>;

  constructor() {
    this.ormRepository = getRepository(UsuarioModel);
  }

  public async findById(codigo: string): Promise<UsuarioModel | undefined> {
    const user = await this.ormRepository.findOne(codigo);

    return user;
  }

  public async findByEmail(email: string): Promise<UsuarioModel | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    expect_user_id,
  }: IFindAllProvidersDTO): Promise<UsuarioModel[]> {
    let users: UsuarioModel[];

    if (expect_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expect_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<UsuarioModel> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: UsuarioModel): Promise<UsuarioModel> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
