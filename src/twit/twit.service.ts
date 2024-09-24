import { Twit, PrismaClient } from '@prisma/client'
import {ICreateTwit} from './twit.types'

export class TwitService {
    private prisma= new PrismaClient()

    createTwit(twit: ICreateTwit): Promise<Twit> {
        return this.prisma.twit.create({
            data: twit
        })
    }

    async getTwits(): Promise<Twit[]> {
        return this.prisma.twit.findMany()
    }
}
