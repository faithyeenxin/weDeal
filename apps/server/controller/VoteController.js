const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route
router.get("/seed", async (req, res) => {
  await prisma.votes.deleteMany();
  const seedVotes = await prisma.votes.createMany({
    data: [
      {
        dealId: "1edf02f8-cd5d-4d44-b539-37b261af55ca",
        userId: "73b029af-2571-49ca-aa10-d8a907f72784",
      },
    ],
  });
  const allVotes = await prisma.votes.findMany();
  res.status(200).send(allVotes);
});

//* Show All Votes
router.get("/", async (req, res) => {
  const allVotes = await prisma.votes.findMany();
  res.status(200).send(allVotes);
});

//* Show By UserID
router.get("/byuser/:id", async (req, res) => {
  const { id } = req.params;
  const votes = await prisma.votes.findMany({
    where: {
      userId: id,
    },
  });
  res.status(200).send(votes);
});

//* Show By DealID
router.get("/bydeal/:id", async (req, res) => {
  const { id } = req.params;
  const votes = await prisma.votes.findMany({
    where: {
      dealId: id,
    },
  });
  res.status(200).send(votes);
});

//* Testing composite ID
router.get("/deal-user-vote-detail", async (req, res) => {
  const { dealId, userId } = req.body;
  const votes = await prisma.votes.findUnique({
    where: {
      dealId_userId: {
        userId: userId,
        dealId: dealId,
      },
    },
  });
  res.status(200).send(votes);
});

/* 
Upvote/Downvote flow of thought-
a user can upvote/downvote a deal, there are a few scenarios:
1) user has not voted and upvote/downvote, 
voteStatus would change from 0 to +1/-1 accordingly

2) user has voted and would like to cancel upvote/downvote, 
voteStatus would change from +1/-1 to 0 

3) user has upvoted/downvoted and decided to downvote/upvote instead, 
voteStatus would change from +1/-1 to -1/+1
*/

//* Upvote
router.post("/upvote/:userId/:dealId", async (req, res) => {
  const { dealId, userId } = req.params;
  const vote = await prisma.votes.findUnique({
    where: {
      dealId_userId: {
        userId: userId,
        dealId: dealId,
      },
    },
  });
  // res.send(vote);
  // 1) if no vote present -> create
  if (!vote) {
    const deal = await prisma.votes.create({
      data: {
        userId: userId,
        dealId: dealId,
        voteStatus: 1,
      },
    });
    res.status(200).send(deal);
    // 2) if vote present and =-1 > make it 1
  } else if (vote.voteStatus === -1 || vote.voteStatus === 0) {
    const deal = await prisma.votes.update({
      where: {
        dealId_userId: {
          userId: userId,
          dealId: dealId,
        },
      },
      data: {
        userId: userId,
        dealId: dealId,
        voteStatus: 1,
      },
    });
    res.status(200).send(deal);
    // 3) if vote present and =1 > cancel vote
  } else if (vote.voteStatus === 1) {
    const deal = await prisma.votes.update({
      where: {
        dealId_userId: {
          userId: userId,
          dealId: dealId,
        },
      },
      data: {
        userId: userId,
        dealId: dealId,
        voteStatus: 0,
      },
    });
    res.status(200).send(deal);
    // 4) this line captures any bugs
  } else {
    console.log(vote.voteStatus);
    res.status(400).send({ err: "not sure what went wrong" });
  }
});

//* Downvote
router.post("/downvote/:userId/:dealId", async (req, res) => {
  const { dealId, userId } = req.params;
  const vote = await prisma.votes.findUnique({
    where: {
      dealId_userId: {
        userId: userId,
        dealId: dealId,
      },
    },
  });
  // res.send(vote);
  // 1) if no vote present -> create
  if (!vote) {
    const deal = await prisma.votes.create({
      data: {
        userId: userId,
        dealId: dealId,
        voteStatus: -1,
      },
    });
    res.status(200).send(deal);
    // 2) if vote present and =1 > make it -1
  } else if (vote.voteStatus === 1 || vote.voteStatus === 0) {
    const deal = await prisma.votes.update({
      where: {
        dealId_userId: {
          userId: userId,
          dealId: dealId,
        },
      },
      data: {
        userId: userId,
        dealId: dealId,
        voteStatus: -1,
      },
    });
    res.status(200).send(deal);
    // 3) if vote present and =-1 > cancel vote
  } else if (vote.voteStatus === -1) {
    const deal = await prisma.votes.update({
      where: {
        dealId_userId: {
          userId: userId,
          dealId: dealId,
        },
      },
      data: {
        userId: userId,
        dealId: dealId,
        voteStatus: 0,
      },
    });
    res.status(200).send(deal);
    // 4) this line captures any bugs
  } else {
    console.log(vote.voteStatus);
    res.status(400).send({ err: "not sure what went wrong" });
  }
});
module.exports = router;
