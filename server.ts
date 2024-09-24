import express, { NextFunction, Request, Response } from 'express'
import { twitRouter } from './src/twit/twit.controller'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { logger } from './src/utils/log'
import helmet from 'helmet'
import compression from 'compression'

dotenv.config()

const app = express()

export const prisma = new PrismaClient()

app.set('view engine', 'ejs')

async function main() {
    app.use(helmet())
    app.use(compression())
    app.use(express.json())

    app.use('/api/twits', twitRouter)

    app.all('*', (req, res) => {
        res.status(404).json({
            message: 'Not Found'
        })
    })

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.stack)
        res.status(500).send('Something wrong')
    })

    const PORT = process.env.PORT || 4200

    app.listen( PORT, () => {
        logger.info(`Server is running on port ${PORT}`)
    })
}

main()
    .then(async () => {
        await prisma.$connect()
    })
    .catch(async e => {
        logger.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
