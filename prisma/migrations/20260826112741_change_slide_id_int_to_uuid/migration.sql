/*
  Warnings:

  - The primary key for the `Slide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Prsesentation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prsesentation" DROP CONSTRAINT "Prsesentation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_presentationId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "issuer" TEXT;

-- AlterTable
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slideLayout" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "presentationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Slide_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Slide_id_seq";

-- DropTable
DROP TABLE "Prsesentation";

-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "totalSlides" INTEGER NOT NULL,
    "themeColors" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
