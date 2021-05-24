const csvtojson = require("csvtojson");
const Data = require("../models/data");

const upload = (req, res) => {
  const filePath = __basedir + "/uploads/" + req.file.filename;
  csvtojson()
    .fromFile(filePath)
    .then((csvData) => {
      for (let i = 0; i < csvData.length; i++) {
        const data = new Data({
          id: csvData[i].id,
          title: csvData[i].title,
          published: csvData[i].published,
        });
        data
          .save()
          .then((mber) => {
            console.log(mber);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  res.send("Data saved successfully!!");
};

module.exports = {
  upload,
};
