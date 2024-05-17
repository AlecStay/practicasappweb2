"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json()); // Middleware para parsear JSON
// Rutas
app.use('/equipos', routes_1.equipoRouter);
app.use('/torneos', routes_1.torneoRouter);
app.use('/partidos', routes_1.partidoRouter);
const PORT = process.env.PORT || 3000; // Puerto en el que corre el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
