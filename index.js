const express = require("express"),
  morgan = require("morgan"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  Movies = Models.Movie,
  Users = Models.User,
  uuid = require("uuid");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/Betamax", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// //---------- ENDPOINTS ----------

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my Movie app!");
});

// API Documentation
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// List all Movies
app.get("/movies", (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


// "Get Movies by Title"
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((title) => {
    res.json(title);
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send("Can't find a movie with that Title!");
  });
});

// Filter Movies with Genre
app.get("/movies/genre/:Genre", (req, res) => {
  Movies.find({"Genre.Name":  req.params.Genre })
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send("Can't find a movie with that genre!");
  });
});

// Filter Movies with Director
app.get("/movies/directors/:directorName", (req, res) => {
  Movies.find({"Director.Name":  req.params.directorName })
  .then((director) => {
    res.status(201).json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send("Can't find a director with that name!");
  });
});

// Director info by name
app.get("/movies/directors/info/:directorName", (req, res) => {
  Movies.findOne({"Director.Name":  req.params.directorName }, { "Director.Bio":1, "_id":0})
  .then((director) => {
    res.status(201).json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send("Can't find a director with that name!");
  });
});

// returns the image link of the searched movie
app.get("/movies/:Title/image/", (req, res) => {
  Movies.findOne({"Title":  req.params.Title }, { "ImageURL":1, "_id":0})
  .then((director) => {
    res.status(201).json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send("Can't find a movie with that title!");
  });
});

// List all Users
app.get("/users/all", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add new user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Update new user
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Delete an existing user by Username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add FavMovie to user
app.post("/users/:Username/:movieTitle", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { favoriteMovies: req.params.movieTitle }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

// Delete FavMovie from user
app.delete("/users/:Username/:movieID", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { favoriteMovies: req.params.movieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
  next();
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
