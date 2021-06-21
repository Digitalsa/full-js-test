import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
class UsuarioModel {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default UsuarioModel;
