/*
  Warnings:

  - Added the required column `issuer` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuer_data` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "issuer" TEXT NOT NULL,
ADD COLUMN     "issuer_data" TIMESTAMP(3) NOT NULL;
