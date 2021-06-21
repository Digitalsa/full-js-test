import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import AuthenticateUserService from "../services/AuthenticateUserService";


export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    console.log(req.body)
    console.log("fasddsafadsf")

    var { email, senha } = req.body;

    senha = '$2a$08$jQrU2Dkn6mlih7p5VaeW0upcDAipZj7din0eqzoP9IzeT0Dzu5qQO';

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, senha });

    delete user.senha;

    return res.json({ user, token });
  }
}
