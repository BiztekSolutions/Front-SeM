-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_idUser_fkey";

-- AlterTable
ALTER TABLE "Credential" ALTER COLUMN "idUser" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;
