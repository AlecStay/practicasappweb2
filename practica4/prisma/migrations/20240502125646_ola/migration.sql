-- CreateTable
CREATE TABLE "Equipo" (
    "idequipo" SERIAL NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Serie" TEXT NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("idequipo")
);

-- CreateTable
CREATE TABLE "Torneo" (
    "idtorneo" SERIAL NOT NULL,
    "Descripcion" TEXT NOT NULL,

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("idtorneo")
);

-- CreateTable
CREATE TABLE "Partido" (
    "idpartido" SERIAL NOT NULL,
    "torneoId" INTEGER NOT NULL,
    "equipo1Id" INTEGER NOT NULL,
    "equipo2Id" INTEGER NOT NULL,
    "golesEquipo1" INTEGER NOT NULL,
    "golesEquipo2" INTEGER NOT NULL,
    "observacion" TEXT NOT NULL,

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("idpartido")
);

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("idtorneo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_equipo1Id_fkey" FOREIGN KEY ("equipo1Id") REFERENCES "Equipo"("idequipo") ON DELETE RESTRICT ON UPDATE CASCADE;
