-- CreateTable
CREATE TABLE "Prsesentation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "totalSlides" INTEGER NOT NULL,
    "themeColors" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Prsesentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slidenumber" INTEGER NOT NULL,
    "content" TEXT[],
    "presentationId" INTEGER NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prsesentation" ADD CONSTRAINT "Prsesentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Prsesentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
