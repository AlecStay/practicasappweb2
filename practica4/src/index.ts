import { Router, Request, Response, Application }   from 'express';
import server from 'express'

import { PrismaClient  } from '@prisma/client'

import { equipoRouter, torneoRouter, partidoRouter } from './routes'


const app : Application = server();
const prisma = new PrismaClient();

app.use(server.json()); // Middleware para parsear JSON

// Rutas
app.use('/equipos', equipoRouter);
app.use('/torneos', torneoRouter);
app.use('/partidos', partidoRouter);

const PORT = process.env.PORT || 3000; // Puerto en el que corre el servidor

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});