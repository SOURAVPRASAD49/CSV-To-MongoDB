const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const csvController = require("../controller/csvController");
const crudController = require("../controller/crud");
const authController = require("../controller/auth");

//register user
router.post("/user/signup", authController.registerUser);

//login user
router.post("/user/signin", authController.loginUser);

//uploading csv file
router.post(
  "/csv/upload",
  authController.isAuth,
  upload.single("file"),
  csvController.upload
);

//fetching all blogs from database
router.get("/read/blog", authController.isAuth, crudController.findAll);

//create and save a new blog on database
router.post("/create/blog", authController.isAuth, crudController.create);

//find a single blog with id
router.get("/blog/:id", authController.isAuth, crudController.findOne);

//updata the blog
router.put("/blog/:id", authController.isAuth, crudController.update);

//delete the blog
router.delete("/blog/:id", authController.isAuth, crudController.delete);

module.exports = router;
