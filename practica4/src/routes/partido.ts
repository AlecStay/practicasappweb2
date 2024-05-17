import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const partidos = await prisma.partido.findMany({
            include: {
                torneo: true,
                equipo1: true,
            },
        });
        res.json(partidos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion } = req.body;
    try {
        const newPartido = await prisma.partido.create({
            data: { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion, Estado: 'Activo' }
        });
        res.json(newPartido);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion } = req.body;
    try {
        const updatedPartido = await prisma.partido.update({
            where: { idpartido: parseInt(id, 10) },
            data: { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion }
        });
        res.json(updatedPartido);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedPartido = await prisma.partido.update({
            where: { idpartido: parseInt(id, 10) },
            data: { Estado: 'Eliminado' }
        });
        res.json(deletedPartido);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
