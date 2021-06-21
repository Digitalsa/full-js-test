import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUsuarioService from "../services/CreateUsuarioService";


export default class UsuariosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, senha } = req.body;
    const createUser = container.resolve(CreateUsuarioService);

    const user = await createUser.execute({ name, email, senha });
    delete user.senha;
    return res.json(user);
  }
}
