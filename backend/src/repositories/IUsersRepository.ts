import UsuarioModel from "../models/UsuarioModel";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<UsuarioModel[]>;
  findById(codigo: string): Promise<UsuarioModel | undefined>;
  findByEmail(email: string): Promise<UsuarioModel | undefined>;
  create(data: ICreateUserDTO): Promise<UsuarioModel>;
  save(user: UsuarioModel): Promise<UsuarioModel>;
}
