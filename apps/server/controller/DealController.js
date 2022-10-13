const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route

router.get("/seed", async (req, res) => {
  await prisma.deal.deleteMany();
  const seedDeal = await prisma.deal.createMany({
    data: [
      {
        userId: "bff81b10-0223-4a9f-9954-8f41d6b7a475",
        name: "MOIST DIANE Perfect Beauty Extra Damage Repair Shampoo",
        retailPrice: 16.9,
        discountedPrice: 10.9,
        location: "postal code/ long+ lat here",
        dealLocation: "postal code/ long+ lat here",
        dealPostedDate: new Date(2022, 10, 01),
        dealExpiry: new Date(2022, 11, 20),
        categoryId: "6ea7ed58-cdc3-45be-97db-53e9a2c43a1f",
        totalUpvotes: 10,
        totalDownvotes: 0,
      },
      {
        userId: "bff81b10-0223-4a9f-9954-8f41d6b7a475",
        name: "SILKYGIRL Shine-Free Loose Powder",
        retailPrice: 7.74,
        discountedPrice: 6,
        location: "postal code/ long+ lat here",
        dealLocation: "postal code/ long+ lat here",
        dealPostedDate: new Date(2022, 9, 01),
        dealExpiry: new Date(2022, 11, 25),
        categoryId: "6ea7ed58-cdc3-45be-97db-53e9a2c43a1f",
        totalUpvotes: 25,
        totalDownvotes: 3,
      },
      {
        userId: "bff81b10-0223-4a9f-9954-8f41d6b7a475",
        name: "Garnier Serum Mask - Hydra Bomb Green Tea",
        retailPrice: 2.9,
        discountedPrice: 1.9,
        location: "postal code/ long+ lat here",
        dealLocation: "postal code/ long+ lat here",
        dealPostedDate: new Date(2022, 8, 05),
        dealExpiry: new Date(2022, 12, 20),
        categoryId: "6ea7ed58-cdc3-45be-97db-53e9a2c43a1f",
        totalUpvotes: 72,
        totalDownvotes: 21,
      },
    ],
  });

  res.status(200).send(seedDeal);
});

//* Show All Deals
router.get("/", async (req, res) => {
  const allDeals = await prisma.deal.findMany({
    where: {
      dealExpiry: {
        gt: new Date(),
      },
    },
    include: {
      DealImages: true,
    },
    orderBy: { dealPostedDate: "desc" },
  });
  res.status(200).send(allDeals);
});

//* Show Deals By Search
router.get("/search", async (req, res) => {
  const { name, category, location } = req.query;
  const searchedDeals = await prisma.deal.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
      categoryId: {
        contains: category,
      },
      location: { contains: location, mode: "insensitive" },
      dealExpiry: {
        gt: new Date(),
      },
    },
    include: {
      DealImages: true,
      category: true,
    },
    orderBy: { dealPostedDate: "desc" },
  });

  res.status(200).send(searchedDeals);
});

//* Show By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const deal = await prisma.deal.findUnique({
    where: {
      id: id,
    },
    include: {
      DealImages: true,
    },
  });
  res.status(200).send(deal);
});

/*
WHAT I RECEIVE
  const body = {
    userId: id,
    name: values.name,
    retailPrice: values.retailPrice,
    discountedPrice: values.discountedPrice,
    location: values.location,
    dealExpiry: values.dealExpiry,
    categoryId: categoryItem[0].id,
    uploadedImages: res.data.imageLinks.map((imgUrl: string) => {
      return { dealId: id, image: imgUrl };
    }),
  };
*/

/*
FORMAT ALLOWED FOR CREATION

const body = {
	"userId": "bff81b10-0223-4a9f-9954-8f41d6b7a475",
	"name": "MOIST DIANE Perfect Beauty Fresh & Hydrate Shampoo",
	"retailPrice": 16.9,
	"discountedPrice": 10.9,
	"location": "postal code/ long+ lat here",
	"dealExpiry": "2022-12-19T16:00:00.000Z",
	"categoryId": "6ea7ed58-cdc3-45be-97db-53e9a2c43a1f"
}
*/

/* 
const dealImage = {
	"dealId": "b652a2a3-78db-4700-9390-b1b03b02450c",
	"image": "https://api.watsons.com.sg/medias/prd-front-56860.jpg?context=bWFzdGVyfGZyb250L3ByZHwxMjY0MXxpbWFnZS9qcGVnfGZyb250L3ByZC9oMmQvaDA5LzkxODY2NjgwNTI1MTAuanBnfDhlZDFjOWY2MmIxN2ExZGUwZDM3ZTg2OTZlMzJjZWRkZjNlMjYxNmUzY2UwNGNiODI2YTU3YjliZTM5MTMzYTk"
}
*/

//* Create
router.post("/", async (req, res) => {
  const {
    userId,
    name,
    retailPrice,
    discountedPrice,
    location,
    locationAddress,
    locationLat,
    locationLong,
    dealExpiry,
    categoryId,
    uploadedImages,
  } = req.body;

  const deal = await prisma.deal.create({
    data: {
      userId: userId,
      name: name,
      retailPrice: retailPrice,
      discountedPrice: discountedPrice,
      location: location,
      locationAddress: locationAddress,
      locationLat: locationLat,
      locationLong: locationLong,
      dealExpiry: dealExpiry,
      categoryId: categoryId,
    },
  });
  const uploadedImagesArray = uploadedImages.map((imageUrl) => {
    return { dealId: deal.id, image: imageUrl };
  });
  const images = await prisma.dealImages.createMany({
    data: uploadedImagesArray,
  });

  const dealCreated = await prisma.deal.findUnique({
    where: { id: deal.id },
    include: {
      DealImages: true,
    },
  });
  res.status(200).send(dealCreated);
});

//* Update
router.patch("/:id", async (req, res) => {
  const {
    id,
    name,
    retailPrice,
    discountedPrice,
    location,
    dealExpiry,
    locationAddress,
    locationLat,
    locationLong,
  } = req.body;

  const deal = await prisma.deal.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      retailPrice: retailPrice,
      discountedPrice: discountedPrice,
      location: location,
      locationAddress: locationAddress,
      locationLat: locationLat,
      locationLong: locationLong,
      dealExpiry: dealExpiry,
      dealPostedDate: new Date(),
    },
  });
  res.status(200).send(deal);
});

//* Update Upvote
router.patch("/upvote/:id", async (req, res) => {
  const { id } = req.params;

  const deal = await prisma.deal.update({
    where: {
      id: id,
    },
    data: {
      totalUpvotes: { increment: 1 },
    },
  });
  res.status(200).send(deal);
});

//* Update Downvote
router.patch("/downvote/:id", async (req, res) => {
  const { id } = req.params;
  const deal = await prisma.deal.update({
    where: {
      id: id,
    },
    data: {
      totalDownvotes: { increment: 1 },
    },
  });
  res.status(200).send(deal);
});

//* Delete

//* 1) delete images
//* 2) delete deal
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedImages = await prisma.dealImages.deleteMany({
    where: { dealId: id },
  });
  const deletedDeal = await prisma.deal.delete({
    where: {
      id: id,
    },
  });
  res.status(200).send(deletedDeal);
});

module.exports = router;
