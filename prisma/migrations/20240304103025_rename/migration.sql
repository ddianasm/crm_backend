/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToUsers" DROP CONSTRAINT "_ProductToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToUsers" DROP CONSTRAINT "_ProductToUsers_B_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "_ProductToUsers";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToUsers_AB_unique" ON "_ProductsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToUsers_B_index" ON "_ProductsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_ProductsToUsers" ADD CONSTRAINT "_ProductsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToUsers" ADD CONSTRAINT "_ProductsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
