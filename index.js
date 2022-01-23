const express = require("express"),
  morgan = require("morgan"),
  app = express();

app.use(morgan("common"));

app.use(express.static("public"));

let movies = [
  {
    title: "The Dark Knight",
    author: "Christopher Nolan",
  },
  {
    title: "Lord of the Rings: Return of the King",
    director: "Peter Jackson",
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
  },
  {
    title: "Matrix",
    director: ["Lana Wachowski", "Lilly Wachowski"],
  },
  {
    title: "Back to the Future",
    director: "Robert Zemeckis",
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Spielberg",
  },
  {
    title: "The Shawshank redemption",
    director: "Frank Darabont",
  },
  {
    title: "Alien",
    director: "Ridley Scott",
  },
  {
    title: "Avengers: Endgame",
    director: ["Anthony Russo", "Joe Russo"],
  },
  {
    title: "Rocky",
    director: "John G. Avildsen",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my Movie app!");
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("There is an error!!");
  next();
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
