import { Router } from 'express';
import UsuariosController from '../controller/UsuariosController';

const usuarioRoutes = Router();
const usuariosController = new UsuariosController();

usuarioRoutes.post('/', usuariosController.create);


export default usuarioRoutes;
