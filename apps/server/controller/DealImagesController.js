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
        dealId: "1cc092db-2c43-40dd-9ec5-ce3d26855f78",
        image:
          "https://api.watsons.com.sg/medias/zoom-front-56858.jpg?context=bWFzdGVyfGZyb250L3pvb218NzMyMjB8aW1hZ2UvanBlZ3xmcm9udC96b29tL2g2ZC9oM2UvOTE4NjY2ODkzNzI0Ni5qcGd8MTE2ZmU4MjYyY2FlMWEzZTE4NzNiNDllOGNkODIyZDY3YzZkZTY3NzNjYzU5NzVjODhiM2I2ODQ0YTcwMDI2Yg",
      },
      {
        dealId: "1cc092db-2c43-40dd-9ec5-ce3d26855f78",
        image:
          "https://api.watsons.com.sg/medias/zoom-front-56862.jpg?context=bWFzdGVyfGZyb250L3pvb218NzI5NjJ8aW1hZ2UvanBlZ3xmcm9udC96b29tL2g2Yi9oMDgvOTE4NjY5NzUxMDk0Mi5qcGd8MzYxY2E5NmI2ZjNlOGNlYjVlNzEwYmY4NGYyNTJiNmEzZWUzNTY5ZjQ0ZjU0NTM3YTY1OTUwNzAyNDhhYjZhMA",
      },
      {
        dealId: "1cc092db-2c43-40dd-9ec5-ce3d26855f78",
        image:
          "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13136324_XL1_20220822.jpg",
      },
    ],
  });

  res.status(200).send(seedDealImages);
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
