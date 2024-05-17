import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para llenar la entidad Equipo con 10 elementos
async function llenarEquipo() {
  try {
    const nuevosEquipos = [];
    for (let i = 0; i < 10; i++) {
      const nuevoEquipo = await prisma.equipo.create({
        data: {
          Descripcion: `Equipo ${i + 1}`,
          Serie: `Serie ${i % 3 + 1}`,
        },
      });
      nuevosEquipos.push(nuevoEquipo);
    }
    console.log("Se han insertado 10 equipos:", nuevosEquipos);
  } catch (error) {
    console.error("Error al insertar equipos:", error);
  }
}

// Función para llenar la entidad Torneo con 10 elementos
async function llenarTorneo() {
  try {
    const nuevosTorneos = [];
    for (let i = 0; i < 10; i++) {
      const nuevoTorneo = await prisma.torneo.create({
        data: {
          Descripcion: `Torneo ${i + 1}`,
        },
      });
      nuevosTorneos.push(nuevoTorneo);
    }
    console.log("Se han insertado 10 torneos:", nuevosTorneos);
  } catch (error) {
    console.error("Error al insertar torneos:", error);
  }
}

// Función para llenar la entidad Partido con 10 elementos
async function llenarPartido() {
  try {
    const nuevosPartidos = [];
    for (let i = 0; i < 10; i++) {
      const nuevoPartido = await prisma.partido.create({
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
  } catch (error) {
    console.error("Error al insertar partidos:", error);
  }
}


// Función para mostrar todos los partidos con sus atributos relacionados
async function mostrarTodosLosPartidos() {
  try {
    const partidos = await prisma.partido.findMany({
      include: {
        torneo: true,
        equipo1: true,
      },
    });
    console.log("Todos los partidos:", partidos);
  } catch (error) {
    console.error("Error al mostrar todos los partidos:", error);
  }
}

// Función para buscar un partido por su ID y mostrarlo con sus atributos relacionados
async function buscarPartidoPorId(id: number) {
    try {
      const partido = await prisma.partido.findUnique({
        where: {
          idpartido: id,
        },
        include: {
          torneo: true,
          equipo1: true,
        },
      });
      console.log("Partido encontrado:", partido);
    } catch (error) {
      console.error("Error al buscar el partido por su ID:", error);
    }
  }


async function main() {
  // Llenar las entidades con 10 elementos cada una
  await llenarEquipo();
  await llenarTorneo();
  await llenarPartido();

  // Buscar y mostrar un partido por su ID
  const idBusqueda = 1; // Reemplazar con el ID deseado
  await buscarPartidoPorId(idBusqueda);

  // Mostrar todos los partidos con sus atributos relacionados
  await mostrarTodosLosPartidos();

  // Desconectar Prisma al finalizar
  await prisma.$disconnect();
}

// Ejecutar la función principal
main().catch(error => console.error("Error en la función principal:", error));
