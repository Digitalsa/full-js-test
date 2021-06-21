import { injectable, inject } from "tsyringe";

import AppError from '../errors/AppError';

import UsuarioModel from '../models/UsuarioModel';
import { hash } from 'bcryptjs';
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  senha: string;
}

@injectable()
class CreateUsuarioService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ name, senha, email }: IRequest): Promise<UsuarioModel> {

    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('E-mail já cadastrado!!', 401);
    }

    const hashPassword = await hash(senha, 8);

    const user = this.usersRepository.create({ name, senha: hashPassword, email });

    return user;
  }
};

export default CreateUsuarioService;
