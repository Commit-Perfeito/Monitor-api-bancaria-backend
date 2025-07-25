import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ScriptSeeder } from './script/ScriptSeeder';
import { Bank } from '@modules/Bank/infra/typeorm/entities/Bank';
import { Record } from '@modules/Record/infra/typeorm/entities/Record';

const port = process.env.DB_PORT as number | undefined; // porta do banco de dados do .env

// parametros para a seed e migration do banco de dados
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // Desative synchronize para gerar migrações corretamente
  entities: [Bank, Record],
  // entities: [`${__dirname}/modules/**/infra/typeorm/entities/*.{ts,js}`],
  migrations: [`${__dirname}/shared/infra/typeorm/migrations/*.{ts,js}`], //local de migrations
  migrationsTableName: 'migrations', // tabela das migrations
  seeds: [ScriptSeeder], // local da seed
};
export const AppDataSource = new DataSource(options);
