const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload csv files only.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-files-${file.originalname}`);
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: csvFilter,
});

module.exports = uploadFile;
