const Data = require("../models/data");

//geting all data
module.exports.findAll = (req, res) => {
  Data.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of datas.",
      });
    });
};

//creating and save data
module.exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }

  //create data
  const data = new Data({
    id: req.body.id,
    title: req.body.title,
    published: req.body.published,
  });

  data
    .save()
    .then((savedData) => {
      res.send(savedData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new data.",
      });
    });
};

//geting a single data
module.exports.findOne = (req, res) => {
  Data.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id,
        });
      }
      res.status(500).send({
        message: "Error getting data with id " + req.params.id,
      });
    });
};

//update data
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }

  Data.findByIdAndUpdate(
    req.params.id,
    {
      id: req.body.id,
      title: req.body.title,
      published: req.body.published,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id,
        });
      }
      res.status(500).send({
        message: "Error getting data with id " + req.params.id,
      });
    });
};

//delete data
module.exports.delete = (req, res) => {
  Data.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id,
        });
      }
      res.send({
        message: "data deleted successfully!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Data not found with id " + req.params.id,
        });
      }
      res.status(500).send({
        message: "could not delete data with id " + req.params.id,
      });
    });
};
