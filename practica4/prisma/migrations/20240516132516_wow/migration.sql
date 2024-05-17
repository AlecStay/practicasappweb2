-- AlterTable
ALTER TABLE "Equipo" ADD COLUMN     "Estado" TEXT NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Partido" ADD COLUMN     "Estado" TEXT NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Torneo" ADD COLUMN     "Estado" TEXT NOT NULL DEFAULT 'Activo';
