/** @format */

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

// const category = [
//   {
//     id: "d158508c-8056-4f2f-a19a-0bc7fc44a3ad",
//     name: "women's fashion",
//   },
//   {
//     id: "1763d56a-4151-45f7-a2aa-97b53fd4e4df",
//     name: "men's fashion",
//   },
//   {
//     id: "cc9dc94e-7cce-45aa-8dbd-c8b5b66ca4f0",
//     name: "beauty & personal care",
//   },
//   {
//     id: "331e1099-3d55-419f-a054-2b3fd7192dcb",
//     name: "health & nutrition",
//   },
//   {
//     id: "0cf6fd05-786f-4d59-bce6-940ba65a24ac",
//     name: "pet supplies",
//   },
//   {
//     id: "14e00a59-a332-4c9f-8138-1be07140bc05",
//     name: "babies & kids",
//   },
//   {
//     id: "82a97f8e-484f-484e-a3b0-821e183e6475",
//     name: "food & drinks",
//   },
//   {
//     id: "ffe8f766-f2ce-495d-95e6-75ca9d2c515e",
//     name: "furniture & home living",
//   },
//   {
//     id: "36a5715e-0de6-4b3b-8da6-3b14de0ed25e",
//     name: "home appliances",
//   },
//   {
//     id: "1caec60a-e296-4354-816b-3a67e24a5ee7",
//     name: "learning & enrichment",
//   },
//   {
//     id: "c8fc6f69-739a-41a6-ad61-b99d471e7ddd",
//     name: "sports equipment",
//   },
//   {
//     id: "ea353684-c0f0-454b-a8c3-3fc53d0259f7",
//     name: "hobbies & toys",
//   },
//   {
//     id: "51c2599b-1409-4e40-bcf1-bf39b2aa317c",
//     name: "computer & tech",
//   },
//   {
//     id: "840b6c63-940f-4fa2-aa0a-6b6b4d98d657",
//     name: "mobile phones & gadgets",
//   },
//   {
//     id: "b6e5a7fa-859b-43cc-88d3-1cb9bef85956",
//     name: "luxury ",
//   },
//   {
//     id: "5a765861-8bbc-4dc3-a584-725590491e7a",
//     name: "car accessories",
//   },
// ];
