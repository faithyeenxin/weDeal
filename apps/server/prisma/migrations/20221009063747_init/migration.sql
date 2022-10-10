/*
  Warnings:

  - You are about to drop the column `dealLocation` on the `Deal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "dealLocation",
ADD COLUMN     "dealerLocation" TEXT;
