const express = require("express");
const app = express();
const port = process.env.PORT ?? 3000;
const cloudinary = require("cloudinary");
const multer = require("multer");

//////////////////////////////////////////////////////
//// * Controllers
//////////////////////////////////////////////////////
const UserController = require("./controller/UserController");
const DealController = require("./controller/DealController");
const DealImagesController = require("./controller/DealImagesController");
const CategoryController = require("./controller/CategoryController");

//////////////////////////////////////////////////////
//// * Middleware
//////////////////////////////////////////////////////
app.use(express.static("../client/dist"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/user", UserController);
app.use("/api/deal", DealController);
app.use("/api/dealimages", DealImagesController);
app.use("/api/category", CategoryController);

//////////////////////////////////////////////////////
//// * Cloudinary
//////////////////////////////////////////////////////

const { cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } = process.env;

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

const upload = multer({ storage });

// get project images
app.get("/api/getimages", async (req, res) => {
  const { resources } = await cloudinary.v2.search
    .expression("folder:projects")
    .max_results(8)
    .execute();

  const imgUrl = resources.map((file) => file.url);
  res.send(imgUrl);
});

// upload project images
app.post(
  "/api/upload-images",
  upload.array("uploadedFiles", 10),
  async (req, res) => {
    try {
      const imagesFiles = req.files;
      console.log(imagesFiles);
      if (!imagesFiles)
        return res.status(400).send({ msg: "No picture attached!" });

      const multiplePicturePromise = imagesFiles.map((picture) =>
        cloudinary.v2.uploader.upload(picture.path, {
          upload_preset: "Project",
        })
      );

      const imageResponses = await Promise.all(multiplePicturePromise);
      const imageLinks = imageResponses.map((image) => image.url);
      console.log(imageLinks);

      res.status(200).send({ imageLinks });
    } catch (err) {
      res.status(500).send({ msg: "Unable to upload" });
    }
  }
);

//////////////////////////////////////////////////////
//// * General Routes
//////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("This is my backend home route!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
