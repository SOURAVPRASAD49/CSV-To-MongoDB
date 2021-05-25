const Blog = require("../models/blog");

//geting all blogs
module.exports.findAll = (req, res) => {
  Blog.find()
    .then((blogData) => {
      res.send(blogData);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of blogs.",
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

  //create new blog
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    likes: req.body.likes,
    published: req.body.published,
  });

  blog
    .save()
    .then((blogData) => {
      res.send(blogData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new Blog.",
      });
    });
};

//geting a single blog
module.exports.findOne = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.send(blog);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.status(500).send({
        message: "Error getting blog with id " + req.params.id,
      });
    });
};

//update the blog
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }

  Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      likes: req.body.likes,
      published: req.body.published,
    },
    { new: true }
  )
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.send(blog);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.status(500).send({
        message: "Error getting blog with id " + req.params.id,
      });
    });
};

//delete the blog
module.exports.delete = (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.send({
        message: "Blog deleted successfully!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Blog not found with id " + req.params.id,
        });
      }
      res.status(500).send({
        message: "could not delete blog with id " + req.params.id,
      });
    });
};
