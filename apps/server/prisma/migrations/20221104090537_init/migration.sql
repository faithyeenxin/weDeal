/*
  Warnings:

  - You are about to drop the column `totalDownvotes` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `totalUpvotes` on the `Deal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "totalDownvotes",
DROP COLUMN "totalUpvotes";
