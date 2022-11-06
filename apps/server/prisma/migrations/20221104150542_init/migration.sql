/*
  Warnings:

  - The primary key for the `Votes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Votes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Votes_pkey" PRIMARY KEY ("dealId", "userId");
