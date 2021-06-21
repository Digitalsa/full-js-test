import { Router } from 'express';
import portifolioRoutes from './portifolio.routes';
import usuarioRoutes from './usuarios.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/portifolio', portifolioRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
