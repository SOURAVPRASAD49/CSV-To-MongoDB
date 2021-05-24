const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const csvController = require("../controller/csvController");
const crudController = require("../controller/crud");
const authController = require("../controller/auth");

//register user
router.post("/user/register", authController.registerUser);

//login user
router.post("/user/login", authController.loginUser);

//uploading csv file
router.post(
  "/csv/upload",
  authController.isAuth,
  upload.single("file"),
  csvController.upload
);

//fetching all datas from database
router.get("/read/data", authController.isAuth, crudController.findAll);

//create and save data
router.post("/create/data", authController.isAuth, crudController.create);

//find a single data with id
router.get("/data/:id", authController.isAuth, crudController.findOne);

//updata data
router.put("/update/:id", authController.isAuth, crudController.update);

//delete data
router.delete("/data/:id", authController.isAuth, crudController.delete);

module.exports = router;
