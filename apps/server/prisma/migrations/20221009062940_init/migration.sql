-- AlterTable
ALTER TABLE "Deal" ALTER COLUMN "dealLocation" DROP NOT NULL,
ALTER COLUMN "totalUpvotes" SET DEFAULT 0,
ALTER COLUMN "totalDownvotes" SET DEFAULT 0;
