const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route

router.get("/seed", async (req, res) => {
  await prisma.dealImages.deleteMany();
  const seedDealImages = await prisma.dealImages.createMany({
    data: [
      {
        dealId: "3ceb51c2-c97b-4354-88b6-1d9499eba809",
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665412938/projects/gl5odsztrpwgxqwghrwg.jpg",
      },
      {
        dealId: "3ceb51c2-c97b-4354-88b6-1d9499eba809",
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665413009/projects/curel1_mcffct.jpg",
      },
      {
        dealId: "3ceb51c2-c97b-4354-88b6-1d9499eba809",
        image:
          "https://res.cloudinary.com/dj6tlm5xx/image/upload/v1665412938/projects/jnpnhjxddva3natnoryd.jpg",
      },
    ],
  });
  const allDealImages = await prisma.dealImages.findMany();
  res.status(200).send(allDealImages);
});

//* Show All Deal Images
router.get("/", async (req, res) => {
  const allDealImages = await prisma.dealImages.findMany();
  res.status(200).send(allDealImages);
});

//* Show By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dealImage = await prisma.dealImages.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).send(dealImage);
});

//* Create
router.post("/", async (req, res) => {
  const newDealImage = req.body;
  const dealImage = await prisma.dealImages.create({
    data: newDealImage,
  });
  res.status(200).send(dealImage);
});

//* Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const dealImage = await prisma.dealImages.update({
    where: {
      id: id,
    },
    data: updatedData,
  });
  res.status(200).send(dealImage);
});

//* Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDealImage = await prisma.dealImages.delete({
    where: {
      id: id,
    },
  });
  res.status(200).send(deletedDealImage);
});
module.exports = router;
