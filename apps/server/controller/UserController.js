const express = require("express");
const router = express.Router();

const SECRET = process.env.SECRET ?? "faithmadethis";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Seed Route

router.get("/seed", async (req, res) => {
  await prisma.user.deleteMany({});
  const seedUsers = await prisma.user.createMany({
    data: [
      {
        username: "admin123",
        password: bcrypt.hashSync("password123", 10),
        name: "Administrator",
        image: "url",
        email: "admin123@hotmail.com",
        dateJoined: new Date(2022, 10, 05),
      },
      {
        username: "faith123",
        password: bcrypt.hashSync("faith123", 10),
        name: "Faith",
        image: "url",
        email: "faith123@hotmail.com",
        dateJoined: new Date(2022, 10, 01),
      },
      {
        username: "ben123",
        password: bcrypt.hashSync("ben123", 10),
        name: "Benjamine",
        image: "url",
        email: "benjamine123@hotmail.com",
        dateJoined: new Date(2022, 10, 02),
      },
      {
        username: "chelsea123",
        password: bcrypt.hashSync("chelsea123", 10),
        name: "Chelsea",
        image: "url",
        email: "chealsea123@hotmail.com",
        dateJoined: new Date(2022, 10, 03),
      },
      {
        username: "dominique123",
        password: bcrypt.hashSync("dom123", 10),
        name: "Dominique",
        image: "url",
        email: "dominique123@hotmail.com",
        dateJoined: new Date(2022, 10, 04),
      },
    ],
  });
  res.status(200).send(seedUsers);
});

//* Show All Users
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).send(allUsers);
});

//* Show By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Deals: {
        orderBy: { dealPostedDate: "desc" },
        include: { DealImages: true },
      },
    },
  });
  res.status(200).send(user);
});

//* Find by Username(Yup validate unique client username)
router.get("/findByUsername/:username", async (req, res) => {
  const { username } = req.params;
  const user = await prisma.user.findMany({ where: { username: username } });
  if (user.length === 0) {
    res.status(400).send([]);
  } else {
    res.status(200).send(user);
  }
});

//* Find by Email(Yup validate unique client username)
router.get("/findByEmail/:email", async (req, res) => {
  const { email } = req.params;
  const user = await prisma.user.findMany({ where: { email: email } });
  if (user.length === 0) {
    res.status(400).send([]);
  } else {
    res.status(200).send(user);
  }
});

//* Create User
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const user = await prisma.user.create({
      data: newUser,
    });
    console.log(user);
    const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
    res.status(200).send({ token: token });
  } catch {
    res.status(400).send({ err: "User already exists" });
  }
});

//* User LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user === null) {
    res.status(400).send({ error: "User Not Found" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(user, SECRET, { expiresIn: "30m" });
    res.status(200).send({ token: token });
  } else {
    res.status(400).send({ error: "Wrong password" });
  }
});

//* Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: updatedData,
  });
  res.status(200).send(user);
});

module.exports = router;
