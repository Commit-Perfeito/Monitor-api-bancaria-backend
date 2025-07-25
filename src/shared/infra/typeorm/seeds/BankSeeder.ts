import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Bank } from '../../../../modules/Bank/infra/typeorm/entities/Bank';

// seeds dos bancos para realizar e identidicar as requisições no plugboleto
export default class BankSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const repository = dataSource.getRepository(Bank);

    await repository.insert([
      { name: 'BANCODOBRASIL_V2', bankCode: 1 },
      { name: 'SANTANDER', bankCode: 33 },
      { name: 'BANRISUL', bankCode: 41 },
      { name: 'INTER', bankCode: 77 },
      { name: 'CAIXA', bankCode: 104 },
      { name: 'ITAU_V2', bankCode: 341 },
      { name: 'ITAU_FRANCESA', bankCode: 341 },
      { name: 'SICREDI_V2', bankCode: 748 },
      { name: 'SICREDI_V3', bankCode: 748 },
      { name: 'SICOOB_V2', bankCode: 756 },
    ]);
  }
}
