import { container } from 'tsyringe'
import IBankRepository from '../../modules/Bank/domain/repositories/IBankRepository'
import { BankRepository } from '../../modules/Bank/infra/typeorm/repository/BankRespository'
import IRecordRepository from '../../modules/Record/domain/repositories/IRecordRepository'
import { RecordRepository } from '../../modules/Record/infra/typeorm/repository/RecordRepository'
import RequestAllService from '@modules/api/services/RequestAllService'

container.registerSingleton<IBankRepository>(
  'BankRepository',
  BankRepository
)
container.registerSingleton<IRecordRepository>(
  'RecordRepository',
  RecordRepository
)
container.register<RequestAllService>(
  'RequestAllService',
  { useClass: RequestAllService }
)