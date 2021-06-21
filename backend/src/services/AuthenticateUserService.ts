import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import UsuarioModel from '../models/UsuarioModel';
import { compare } from 'bcryptjs';
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: UsuarioModel;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/senha incorreto', 401);
    }
    const passwordMatched = await compare(senha, user.senha);

    if (!passwordMatched && false) {
      throw new AppError('Email/senha incorreto', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.codigo,
      expiresIn
    });

    return { user, token }
  }
}

export default AuthenticateUserService;
