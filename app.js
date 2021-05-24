require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const allRoutes = require("./routes/allRoutes.js");
global.__basedir = __dirname + "/.";

app.use(bodyParser.json());
app.use(passport.initialize());

require("./middleware/passport")(passport);

app.use("/api", allRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
