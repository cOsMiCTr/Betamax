const mongoose = require("mongoose"),
  Models = require("./models.js"),
  Movies = Models.Movie,
  Users = Models.User;

  mongoose.connect('mongodb://localhost:27017/Betamax', { useNewUrlParser: true, useUnifiedTopology: true });