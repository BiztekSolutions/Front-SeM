-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "birthday" TIMESTAMP(3),
    "weight" DECIMAL(65,30),
    "rol" TEXT,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Credential" (
    "idCredential" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("idCredential")
);

-- CreateTable
CREATE TABLE "Session" (
    "idSession" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "idCredential" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("idSession")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_email_key" ON "Credential"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_idCredential_fkey" FOREIGN KEY ("idCredential") REFERENCES "Credential"("idCredential") ON DELETE RESTRICT ON UPDATE CASCADE;
