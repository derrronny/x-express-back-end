import { Request, Response, Router } from "express";
import { TwitService } from "./twit.service";
import { authMiddleware } from "../auth.middleware";
import { createTwitDto } from "./twit.dto";

const router = Router()

const twistService = new TwitService()

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    const validation = createTwitDto.safeParse(req.body)

    if (!validation.success) {
        return res.status(400).json({ message: validation.error.errors })
    }

    const twit = await twistService.createTwit(req.body)
    res.status(201).json(twit)
})

router.get('/', async (req: Request, res: Response) => {
    const twits = await twistService.getTwits()
    res.json(twits)
})

export const twitRouter = router
