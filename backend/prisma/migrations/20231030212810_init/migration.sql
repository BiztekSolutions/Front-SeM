-- CreateTable
CREATE TABLE "Routine" (
    "idRoutine" SERIAL NOT NULL,
    "name" TEXT,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "expiration_date" TIMESTAMP(3),
    "objective" TEXT,
    "observation" TEXT,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("idRoutine")
);

-- CreateTable
CREATE TABLE "User_has_Routine" (
    "idUser_has_Routine" SERIAL NOT NULL,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "idUser" INTEGER NOT NULL,
    "idRoutine" INTEGER NOT NULL,

    CONSTRAINT "User_has_Routine_pkey" PRIMARY KEY ("idUser_has_Routine")
);

-- CreateTable
CREATE TABLE "Routine_has_ExerciseGroup" (
    "idRoutine_has_ExerciseGroup" SERIAL NOT NULL,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "idRoutine" INTEGER NOT NULL,
    "idExerciseGroup" INTEGER NOT NULL,

    CONSTRAINT "Routine_has_ExerciseGroup_pkey" PRIMARY KEY ("idRoutine_has_ExerciseGroup")
);

-- CreateTable
CREATE TABLE "ExerciseGroup" (
    "idExerciseGroup" SERIAL NOT NULL,
    "name" TEXT,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "series" INTEGER,
    "repetitions" INTEGER,
    "weight" DECIMAL(65,30),
    "time" INTEGER,

    CONSTRAINT "ExerciseGroup_pkey" PRIMARY KEY ("idExerciseGroup")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "idExercise" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "video" TEXT,
    "type" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("idExercise")
);

-- CreateTable
CREATE TABLE "ExerciseGroup_has_Exercise" (
    "idExerciseGroup_has_Exercise" SERIAL NOT NULL,
    "created_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "idExerciseGroup" INTEGER NOT NULL,
    "idExercise" INTEGER NOT NULL,

    CONSTRAINT "ExerciseGroup_has_Exercise_pkey" PRIMARY KEY ("idExerciseGroup_has_Exercise")
);

-- AddForeignKey
ALTER TABLE "User_has_Routine" ADD CONSTRAINT "User_has_Routine_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_has_Routine" ADD CONSTRAINT "User_has_Routine_idRoutine_fkey" FOREIGN KEY ("idRoutine") REFERENCES "Routine"("idRoutine") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine_has_ExerciseGroup" ADD CONSTRAINT "Routine_has_ExerciseGroup_idRoutine_fkey" FOREIGN KEY ("idRoutine") REFERENCES "Routine"("idRoutine") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine_has_ExerciseGroup" ADD CONSTRAINT "Routine_has_ExerciseGroup_idExerciseGroup_fkey" FOREIGN KEY ("idExerciseGroup") REFERENCES "ExerciseGroup"("idExerciseGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseGroup_has_Exercise" ADD CONSTRAINT "ExerciseGroup_has_Exercise_idExerciseGroup_fkey" FOREIGN KEY ("idExerciseGroup") REFERENCES "ExerciseGroup"("idExerciseGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseGroup_has_Exercise" ADD CONSTRAINT "ExerciseGroup_has_Exercise_idExercise_fkey" FOREIGN KEY ("idExercise") REFERENCES "Exercise"("idExercise") ON DELETE RESTRICT ON UPDATE CASCADE;
