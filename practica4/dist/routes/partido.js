"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield prisma.partido.findMany({
            include: {
                torneo: true,
                equipo1: true,
            },
        });
        res.json(partidos);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion } = req.body;
    try {
        const newPartido = yield prisma.partido.create({
            data: { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion }
        });
        res.json(newPartido);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion } = req.body;
    try {
        const updatedPartido = yield prisma.partido.update({
            where: { idpartido: parseInt(id, 10) },
            data: { torneoId, equipo1Id, equipo2Id, golesEquipo1, golesEquipo2, observacion }
        });
        res.json(updatedPartido);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPartido = yield prisma.partido.delete({
            where: { idpartido: parseInt(id, 10) }
        });
        res.json(deletedPartido);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
