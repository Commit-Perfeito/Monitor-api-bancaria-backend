//Instancia do Espress
//Passar configurações da aplicação
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '../../container/index'
import 'dotenv/config'
import '@shared/utils/Translations'
import cors from 'cors'
import rateLimiter from './middleware/RateLimiter'
import errorHandler from './middleware/errorHandler';
import { router } from './routes/index.routes'

const app = express()

app.use(cors())
app.use(rateLimiter)
app.use(express.json())
app.use(errorHandler)
app.use(router)


export { app }
