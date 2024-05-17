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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Función para llenar la entidad Equipo con 10 elementos
function llenarEquipo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevosEquipos = [];
            for (let i = 0; i < 10; i++) {
                const nuevoEquipo = yield prisma.equipo.create({
                    data: {
                        Descripcion: `Equipo ${i + 1}`,
                        Serie: `Serie ${i % 3 + 1}`,
                    },
                });
                nuevosEquipos.push(nuevoEquipo);
            }
            console.log("Se han insertado 10 equipos:", nuevosEquipos);
        }
        catch (error) {
            console.error("Error al insertar equipos:", error);
        }
    });
}
// Función para llenar la entidad Torneo con 10 elementos
function llenarTorneo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevosTorneos = [];
            for (let i = 0; i < 10; i++) {
                const nuevoTorneo = yield prisma.torneo.create({
                    data: {
                        Descripcion: `Torneo ${i + 1}`,
                    },
                });
                nuevosTorneos.push(nuevoTorneo);
            }
            console.log("Se han insertado 10 torneos:", nuevosTorneos);
        }
        catch (error) {
            console.error("Error al insertar torneos:", error);
        }
    });
}
// Función para llenar la entidad Partido con 10 elementos
function llenarPartido() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevosPartidos = [];
            for (let i = 0; i < 10; i++) {
                const nuevoPartido = yield prisma.partido.create({
                    data: {
                        torneoId: i % 5 + 1, // Asociar cada partido a un torneo existente
                        equipo1Id: (i % 10) + 1, // Asociar equipo1 a uno de los 10 equipos creados
                        equipo2Id: ((i + 1) % 10) + 1, // Asociar equipo2 a uno de los 10 equipos creados (diferente al equipo1)
                        golesEquipo1: Math.floor(Math.random() * 6), // Generar goles aleatorios entre 0 y 5
                        golesEquipo2: Math.floor(Math.random() * 6),
                        observacion: `Observación del partido ${i + 1}`,
                    },
                });
                nuevosPartidos.push(nuevoPartido);
            }
            console.log("Se han insertado 10 partidos:", nuevosPartidos);
        }
        catch (error) {
            console.error("Error al insertar partidos:", error);
        }
    });
}
// Función para mostrar todos los partidos con sus atributos relacionados
function mostrarTodosLosPartidos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const partidos = yield prisma.partido.findMany({
                include: {
                    torneo: true,
                    equipo1: true,
                },
            });
            console.log("Todos los partidos:", partidos);
        }
        catch (error) {
            console.error("Error al mostrar todos los partidos:", error);
        }
    });
}
// Función para buscar un partido por su ID y mostrarlo con sus atributos relacionados
function buscarPartidoPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const partido = yield prisma.partido.findUnique({
                where: {
                    idpartido: id,
                },
                include: {
                    torneo: true,
                    equipo1: true,
                },
            });
            console.log("Partido encontrado:", partido);
        }
        catch (error) {
            console.error("Error al buscar el partido por su ID:", error);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Llenar las entidades con 10 elementos cada una
        yield llenarEquipo();
        yield llenarTorneo();
        yield llenarPartido();
        // Buscar y mostrar un partido por su ID
        const idBusqueda = 1; // Reemplazar con el ID deseado
        yield buscarPartidoPorId(idBusqueda);
        // Mostrar todos los partidos con sus atributos relacionados
        yield mostrarTodosLosPartidos();
        // Desconectar Prisma al finalizar
        yield prisma.$disconnect();
    });
}
// Ejecutar la función principal
main().catch(error => console.error("Error en la función principal:", error));
