import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import BankSeeder from '../seeds/BankSeeder';

// script de seed dos bancos no DB
export class ScriptSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager?: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, BankSeeder);
  }
}
