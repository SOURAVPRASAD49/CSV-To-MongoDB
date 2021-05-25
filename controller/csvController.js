const csvtojson = require("csvtojson");
const Blog = require("../models/blog");

const upload = (req, res) => {
  const filePath = __basedir + "/uploads/" + req.file.filename;
  csvtojson()
    .fromFile(filePath)
    .then((csvData) => {
      for (let i = 0; i < csvData.length; i++) {
        const blog = new Blog({
          title: csvData[i].title,
          description: csvData[i].description,
          likes: csvData[i].likes,
          published: csvData[i].published,
        });
        blog
          .save()
          .then((blogData) => {
            console.log(blogData);
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
