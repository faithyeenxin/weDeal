-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
