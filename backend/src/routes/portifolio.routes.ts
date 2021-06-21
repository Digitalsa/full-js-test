import { Router } from 'express';
import { container } from 'tsyringe';

import PortifolioController from '../controller/PortifolioController';

import authMiddleware from "../middlewares/auth";

const portifolioRoutes = Router();
const portifolioController = new PortifolioController();

portifolioRoutes.use(authMiddleware);

portifolioRoutes.post('/', portifolioController.create);

export default portifolioRoutes;
