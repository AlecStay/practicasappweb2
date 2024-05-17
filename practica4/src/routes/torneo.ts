import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const torneos = await prisma.torneo.findMany();
        res.json(torneos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { Descripcion } = req.body;
    try {
        const newTorneo = await prisma.torneo.create({
            data: { Descripcion, Estado: 'Activo' }
        });
        res.json(newTorneo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Descripcion } = req.body;
    try {
        const updatedTorneo = await prisma.torneo.update({
            where: { idtorneo: parseInt(id, 10) },
            data: { Descripcion }
        });
        res.json(updatedTorneo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedTorneo = await prisma.torneo.update({
            where: { idtorneo: parseInt(id, 10) },
            data: { Estado: 'Eliminado' }
        });
        res.json(deletedTorneo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
