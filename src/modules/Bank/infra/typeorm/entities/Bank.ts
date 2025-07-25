import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'; // importação de funcionalidades do typeorm

// entidadades para a entidade tipar
import { Record } from '../../../../Record/infra/typeorm/entities/Record';
import { IBank } from '../../../domain/models/IBank';

@Entity('banks')
export class Bank implements IBank {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('name-idx')
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'int' })
  bankCode: number;
  @OneToMany(() => Record, (record) => record.bank)
  records: Record[];
}
