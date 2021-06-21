import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import UsuarioModel from './UsuarioModel';

@Entity('portifolio')
class PortifolioModel {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => UsuarioModel)
  @JoinColumn({ name: 'provider_id' })
  provider: UsuarioModel;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default PortifolioModel;
