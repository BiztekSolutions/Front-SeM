/*
  Warnings:

  - You are about to drop the column `repetitions` on the `ExerciseGroup` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `ExerciseGroup` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ExerciseGroup` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ExerciseGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExerciseGroup" DROP COLUMN "repetitions",
DROP COLUMN "series",
DROP COLUMN "time",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "ExerciseGroup_has_Exercise" ADD COLUMN     "repetitions" INTEGER,
ADD COLUMN     "series" INTEGER,
ADD COLUMN     "time" INTEGER,
ADD COLUMN     "weight" DECIMAL(65,30);
