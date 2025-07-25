import { server } from 'src/server'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { ScriptSeeder } from 'src/server/shared/database/script/ScriptSeeder'
import request from 'supertest'
import { count } from 'console'


describe('Records - Integration', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
    const seed = new ScriptSeeder()

    const banks = await AppDataSource.getRepository('banks').count()

    // const factoryManager: SeederFactoryManager
    if (banks === 0) {
      await seed.run(AppDataSource)
    }
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('deve retornar registros filtrando por banco, tipo e status', async () => {
    const bodyRequest = {
      bank: "BANRISUL",
      type: "consulta",
      startDate: "2024-12-05",
      endDate: "2025-12-12",
      status: "ativo"
    }
    const response = await request(server)
      .post('/boletos/list-records')
      .send(bodyRequest)
      .expect(200)

    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })
  it('deve retornar erro como ', async () => {
    const bodyRequest = {
      bank: "",
      type: "consulta",
      startDate: "2024-12-05",
      endDate: "2025-12-12"
    }
    const response = await request(server)
      .post('/boletos/list-records')
      .send(bodyRequest)

    expect(response.status).toBe(400)
  })
})