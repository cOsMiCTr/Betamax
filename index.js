const express = require("express"),
  morgan = require("morgan"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  Movies = Models.Movie,
  Users = Models.User,
  uuid = require("uuid"),
  cors = require("cors"),
  { check, validationResult } = require("express-validator"),
  port = process.env.PORT || 8080;
  app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
   });
   
app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allowed Domains are defined here
let allowedOrigins = ["http://localhost:8080", "http://testsite.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

mongoose.connect("mongodb+srv://cOsMiCTr:clio2000@betamax-cluster.p6qd1.mongodb.net/BetamaxDB?retryWrites=true&w=majority", {
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
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// "Get Movies by Title"
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((title) => {
        res.json(title);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Can't find a movie with that Title!");
      });
  }
);

// Filter Movies with Genre
app.get(
  "/movies/genre/:Genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find({ "Genre.Name": req.params.Genre })
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Can't find a movie with that genre!");
      });
  }
);

// Filter Movies with Director
app.get(
  "/movies/directors/:directorName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find({ "Director.Name": req.params.directorName })
      .then((director) => {
        res.status(201).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Can't find a director with that name!");
      });
  }
);

// Director info by name
app.get(
  "/movies/directors/info/:directorName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne(
      { "Director.Name": req.params.directorName },
      { "Director.Bio": 1, _id: 0 }
    )
      .then((director) => {
        res.status(201).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Can't find a director with that name!");
      });
  }
);

// returns the image link of the searched movie
app.get(
  "/movies/:Title/image/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title }, { ImageURL: 1, _id: 0 })
      .then((director) => {
        res.status(201).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Can't find a movie with that title!");
      });
  }
);

// List all Users
app.get(
  "/users/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password must be between 4 to 16 characters")
      .isLength({ min: 8 })
      .withMessage("Password Must Be at Least 8 Characters")
      .matches("[0-9]")
      .withMessage("Password Must Contain a Number")
      .matches("[A-Z]")
      .withMessage("Password Must Contain an Uppercase Letter")
      .trim()
      .escape(),

    // NormalizeEmail makes the email all lowercase
    // trim removes spaces from the end and at the begining
    // escape adds slash to neutralize the ""

    check("Email", "Email must be in valid format!")
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail(),
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
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
  }
);

// Update a user
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password must be between 4 to 16 characters")
      .isLength({ min: 8 })
      .withMessage("Password Must Be at Least 8 Characters")
      .matches("[0-9]")
      .withMessage("Password Must Contain a Number")
      .matches("[A-Z]")
      .withMessage("Password Must Contain an Uppercase Letter")
      .trim()
      .escape(),

    // NormalizeEmail makes the email all lowercase
    // trim removes spaces from the end and at the begining
    // escape adds slash to neutralize the ""

    check("Email", "Email must be in valid format!")
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail(),
  ],
  (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.Password);
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          console.log("User has been updated");
          res.status(204).json(updatedUser);
        }
      }
    );
  }
);

// Delete an existing user by Username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Add FavMovie to user
app.post(
  "/users/:Username/:movieTitle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { favoriteMovies: req.params.movieTitle },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Delete FavMovie from user
app.delete(
  "/users/:Username/:movieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { favoriteMovies: req.params.movieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
  next();
});



