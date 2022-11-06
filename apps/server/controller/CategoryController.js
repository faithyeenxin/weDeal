const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route

router.get("/seed", async (req, res) => {
  await prisma.category.deleteMany();
  const seedCategory = await prisma.category.createMany({
    data: [
      {
        name: "women's fashion",
      },
      {
        name: "men's fashion",
      },
      {
        name: "beauty & personal care",
      },
      {
        name: "health & nutrition",
      },
      {
        name: "pet supplies",
      },
      {
        name: "babies & kids",
      },
      {
        name: "food & drinks",
      },
      {
        name: "furniture & home living",
      },
      {
        name: "home appliances",
      },
      {
        name: "learning & enrichment",
      },
      {
        name: "sports equipment",
      },
      {
        name: "hobbies & toys",
      },
      {
        name: "computer & tech",
      },
      {
        name: "mobile phones & gadgets",
      },
      {
        name: "luxury ",
      },
      {
        name: "car accessories",
      },
    ],
  });
  const allCategory = await prisma.category.findMany();
  res.status(200).send(allCategory);
});

//* Show All Categories
router.get("/", async (req, res) => {
  const allCategory = await prisma.category.findMany();
  res.status(200).send(allCategory);
});

//* Show By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).send(category);
});

//* Create
router.post("/", async (req, res) => {
  const newCategory = req.body;
  const category = await prisma.category.create({
    data: newCategory,
  });
  res.status(200).send(category);
});

//* Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const category = await prisma.category.update({
    where: {
      id: id,
    },
    data: updatedData,
  });
  res.status(200).send(category);
});

//* Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).send(deletedCategory);
});

module.exports = router;
