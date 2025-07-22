import 'dotenv/config';
import 'reflect-metadata';
import { dirname } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ScriptSeeder } from './server/shared/database/script/ScriptSeeder';

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
  entities: [`${__dirname}/server/modules/**/infra/typeorm/entities/*.{ts,js}`],
  migrations: [`${__dirname}/server/shared/database/migrations/*.{ts,js}`], //local de migrations
  migrationsTableName: 'migrations', // tabela das migrations
  seeds: [ScriptSeeder], // local da seed
};
export const AppDataSource = new DataSource(options);
