import { AppDataSource } from 'data-source';
import request from 'supertest';
import { ScriptSeeder } from '@shared/infra/typeorm/script/ScriptSeeder';
import { app } from '@shared/infra/http/app';

describe('Records - Integration', () => {
  const ENDPOINT_URL = '/boletos/list-records';
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    const seed = new ScriptSeeder();

    const banks = await AppDataSource.getRepository('banks').count();

    if (banks === 0) {
      await seed.run(AppDataSource);
    }
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('deve retornar registros filtrando por banco, tipo e status', async () => {
    const bodyRequest = {
      bank: 'BANRISUL',
      type: 'consulta',
      startDate: '2024-12-05',
      endDate: '2025-12-12',
      status: 'ativo',
    };
    const response = await request(app)
      .post(ENDPOINT_URL)
      .send(bodyRequest)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  }, 10000);
  it('deve retornar erro - banco não informado ', async () => {
    const bodyRequest = {
      bank: '',
      type: 'consulta',
      startDate: '2024-12-05',
      endDate: '2025-12-12',
    };
    const response = await request(app).post(ENDPOINT_URL).send(bodyRequest);
    expect(response.status).toBe(400);
  }, 10000);
  it('deve retornar erro - banco inesxitente ', async () => {
    const bodyRequest = {
      bank: 'Nubank',
      type: 'consulta',
      startDate: '2024-12-05',
      endDate: '2025-12-12',
    };
    const response = await request(app).post(ENDPOINT_URL).send(bodyRequest);
    expect(response.status).toBe(400);
  }, 10000);
  it('deve retornar erro - Data não formata', async () => {
    const bodyRequest = {
      bank: 'BANRISUL',
      type: 'consulta',
      startDate: '2024-12',
      endDate: '2025-12-12',
    };
    const response = await request(app).post(ENDPOINT_URL).send(bodyRequest);
    expect(response.status).toBe(400);
  }, 10000);
  it('deve retornar erro - Data não formata', async () => {
    const bodyRequest = {
      bank: 'BANRISUL',
      type: 'consulta',
      startDate: '2024-12-05',
      endDate: '2025-12',
    };
    const response = await request(app).post(ENDPOINT_URL).send(bodyRequest);
    expect(response.status).toBe(400);
  }, 10000);
});
