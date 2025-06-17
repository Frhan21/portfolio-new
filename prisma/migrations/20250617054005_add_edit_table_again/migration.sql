/*
  Warnings:

  - You are about to drop the column `issuer_data` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `timestamps` on the `User` table. All the data in the column will be lost.
  - Added the required column `issuer_date` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "issuer_data",
ADD COLUMN     "issuer_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "timestamps",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
