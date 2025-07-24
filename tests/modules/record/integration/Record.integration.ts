import { server } from 'src/server'
import { AppDataSource } from 'src/data-source'
import { ScriptSeeder } from 'src/server/shared/database/script/ScriptSeeder'
import request from 'supertest'


describe('Records - Integration', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.runMigrations()
        const seed = new ScriptSeeder()
        // const factoryManager: SeederFactoryManager
        await seed.run(AppDataSource)
    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    it('deve retornar registros filtrando por banco, tipo e status', async () => {
        const response = await request(server)
            .get('/boletos/registro/ITAU_V2')
            .query({ filter: 'WEEK' })

        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
    })
    it('deve retornar registros filtrando por banco, tipo e status', async () => {
        const response = await request(server)
            .get('/boletos/registro/nubank')
            .query({ filter: 'WEEK' })

        expect(response.status).toBe(400)
    })
})