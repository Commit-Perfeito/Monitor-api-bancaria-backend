import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import { IRecord } from '../../../domain/models/IRecord';
import { Bank } from '../../../../Bank/infra/typeorm/entities/Bank';

@Entity('records')
export class Record implements IRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('Type-idx')
  @Column({ type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ type: 'int', nullable: false })
  codeResponse: number;

  @Index('Bank-idx')
  @ManyToOne(() => Bank, (bank) => bank.records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bankId' })
  bank: Bank;

  @Index('date-idx')
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @Index('status-idx')
  @Column({ type: 'varchar', length: 10, nullable: false })
  status: string;

  @Column({ type: 'int', nullable: false })
  timeRequest: number;

  @Column({ type: 'jsonb', nullable: false })
  payloadResponse: object;

  @Column({ type: 'varchar', length: 50, nullable: false })
  detailing: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  responseStatus: string;

  // Colunas de data no banco

  @Index('year-idx')
  @Column({ type: 'int', nullable: true })
  year: number;

  @Index('month-idx')
  @Column({ type: 'int', nullable: true })
  month: number;

  @Index('day-idx')
  @Column({ type: 'int', nullable: true })
  day: number;

  @Index('hour-idx')
  @Column({ type: 'int', nullable: true })
  hour: number;

  @Index('minute-idx')
  @Column({ type: 'int', nullable: true })
  minute: number;

  @Index('second-idx')
  @Column({ type: 'int', nullable: true })
  second: number;

  // Metodo de inserção de dados da data antes de salvar no banco
  @BeforeInsert()
  setDateParts() {
    const date = this.dateCreated || new Date(); // Garante que sempre exista uma data
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1; // Mês começa em 0
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }
}
