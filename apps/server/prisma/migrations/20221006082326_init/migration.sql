/*
  Warnings:

  - Added the required column `image` to the `DealImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DealImages" ADD COLUMN     "image" TEXT NOT NULL;
