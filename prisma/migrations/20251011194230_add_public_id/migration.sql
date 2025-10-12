/*
  Warnings:

  - Added the required column `publicId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "publicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "publicId" TEXT NOT NULL;
