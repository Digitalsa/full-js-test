import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import PortifolioModel from "../models/PortifolioModel";


export default interface IPortifolioRepository {
  create(data: ICreateAppointmentDTO): Promise<PortifolioModel>;
  findByProvider(name: string): Promise<PortifolioModel | undefined>;
  save(portifolio: PortifolioModel): Promise<PortifolioModel>;
}
