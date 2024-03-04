/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_B_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ProductToUser";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToUsers_AB_unique" ON "_ProductToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToUsers_B_index" ON "_ProductToUsers"("B");

-- AddForeignKey
ALTER TABLE "_ProductToUsers" ADD CONSTRAINT "_ProductToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUsers" ADD CONSTRAINT "_ProductToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
