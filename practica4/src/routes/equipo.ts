import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const equipos = await prisma.equipo.findMany();
    if (equipos.length === 0) {
      res.json({ message: 'No hay equipos disponibles', estado: 'Pendiente' });
    } else {
      res.json(equipos);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { Descripcion, Serie } = req.body;
  try {
    const newEquipo = await prisma.equipo.create({
      data: { Descripcion, Serie, Estado: 'Activo' }
    });
    res.json(newEquipo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Descripcion, Serie } = req.body;
  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { idequipo: parseInt(id, 10) },
      data: { Descripcion, Serie }
    });
    res.json(updatedEquipo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { idequipo: parseInt(id, 10) },
      data: { Estado: 'Eliminado' }
    });
    res.json(updatedEquipo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { idequipo: parseInt(id, 10) },
    });
    if (equipo) {
      res.json(equipo);
    } else {
      res.status(404).json({ status: 'Pendiente', message: 'Equipo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
