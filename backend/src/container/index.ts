import { container } from "tsyringe";

import IPortifolioRepository from "../repositories/IPortifolioRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import UsersRepository from "../repositories/UsersRepository";
import PortifolioRepository from "../repositories/PortifolioRepository";

container.registerSingleton<IPortifolioRepository>(
  "PortifolioRepository",
  PortifolioRepository,
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

