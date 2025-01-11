/*
  Warnings:

  - Added the required column `amount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prise` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "customer" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "prise" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
