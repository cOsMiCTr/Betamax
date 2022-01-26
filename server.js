const express = require("express"),
  morgan = require("morgan"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());

// Movies Databank
let movies = [
  {
    id: 1,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Director: {
      Name: "Christopher Nolan",
      bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations.",
      birthYear: 1970,
      deathYear: "",
    },
    releaseDate: "14.07.2008",
    Genre: { Name: ["Action", "Drama"] },
    imageURL: "https://m.media-amazon.com/images/I/91KkWf50SoL._SL1500_.jpg",
  },
  {
    id: 2,
    title: "The Lord of the Rings: The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Director: {
      Name: "Peter Jackson",
      bio: "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter, and film producer.",
      birthYear: 1961,
      deathYear: "",
    },
    releaseDate: "01.12.2003",
    Genre: { Name: "Fantasy" },
    imageURL: "https://m.media-amazon.com/images/I/81kUINEtUbL._SL1408_.jpg",
  },
  {
    id: 3,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    Director: {
      Name: "Christopher Nolan",
      bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations.",
      birthYear: 1970,
      deathYear: "",
    },
    releaseDate: "01.07.2010",
    Genre: { Name: "Action" },
    imageURL: "https://m.media-amazon.com/images/I/71SBgi0X2KL._SL1200_.jpg",
  },
  {
    id: 4,
    title: "Matrix",
    description:
      "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    Director: {
      Name: "Lana Wachowski",
      bio: "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly.",
      birthYear: 1965,
      deathYear: "",
    },
    releaseDate: "17.06.1999",
    Genre: { Name: "Action" },
    imageURL: "https://m.media-amazon.com/images/I/71D8+NFLZmL._SL1500_.jpg",
  },
  {
    id: 5,
    title: "Back to the Future",
    description:
      "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    Director: {
      Name: "Robert Zemeckis",
      bio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)).",
      birthYear: 1951,
      deathYear: "",
    },
    releaseDate: "03.10.1985",
    Genre: { Name: "Action" },
    imageURL: "https://m.media-amazon.com/images/I/51th2-bmq-L.jpg",
  },
  {
    id: 6,
    title: "Saving Private Ryan",
    description:
      "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    Director: {
      Name: "Steven Spielberg",
      bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
      birthYear: 1946,
      deathYear: "",
    },
    releaseDate: "08.10.1998",
    Genre: { Name: "Drama" },
    imageURL: "https://m.media-amazon.com/images/I/417Tz4B7YIL.jpg",
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Director: {
      Name: "Frank Darabont",
      bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School.",
      birthYear: 1959,
      deathYear: "",
    },
    releaseDate: "09.03.1995",
    Genre: { Name: "Drama" },
    imageURL: "https://m.media-amazon.com/images/I/51wdGaBba1L._AC_.jpg",
  },
  {
    id: 8,
    title: "Alien",
    description:
      "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
    Director: {
      Name: "Ridley Scott",
      bio: 'Described by film producer Michael Deeley as "the very best eye in the business", director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear (then County Durham). His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe before they eventually returned to Teesside.',
      birthYear: 1937,
      deathYear: "",
    },
    releaseDate: "23.10.2003",
    Genre: { Name: "Horror" },
    imageURL: "https://m.media-amazon.com/images/I/91jUuRKZlvL._SL1500_.jpg",
  },
  {
    id: 9,
    title: "Avengers: Endgame",
    description:
      "fter the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    Director: {
      Name: "Anthony Russo",
      bio: "Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo. They have directed You, Me and Dupree, Cherry and the Marvel films Captain America: The Winter Soldier, Captain America: Civil War, Avengers: Infinity War and Avengers: Endgame. Endgame is one of the highest grossing films of all time.",
      birthYear: 1970,
      deathYear: "",
    },
    releaseDate: "24.04.2019",
    Genre: { Name: ["Superhero", "Action"] },
    imageURL: "https://m.media-amazon.com/images/I/71s4OWUH2oL._SL1200_.jpg",
  },
  {
    id: 10,
    title: "Rocky",
    description:
      "Rocky is a 1976 American sports drama film written by and starring Sylvester Stallone, and directed by John G. Avildsen.[4] It tells the rags to riches American Dream story of Rocky Balboa (Stallone), an uneducated, kind-hearted working class Italian-American and small-time club fighter who, while working as a debt collector for a loan shark in the slums of Philadelphia, gets a shot at the world heavyweight championship.",
    Director: {
      Name: "John G. Avildsen",
      bio: "John Guilbert Avildsen was an American film director. He is perhaps best known for directing Rocky (1976), which earned him the Academy Award for Best Director, and the first three The Karate Kid films.",
      birthYear: 2017,
      deathYear: "",
    },
    releaseDate: "21.11.1976",
    Genre: { Name: "Drama" },
    imageURL: "https://m.media-amazon.com/images/I/51AP5MY2B5L.jpg",
  },
];

let users = [
  {
    id: 1,
    name: "John",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Carla",
    favoriteMovies: [],
  },
  {
    id: 3,
    name: "Henry",
    favoriteMovies: [],
  },
];

//---------- ENDPOINTS ----------

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my Movie app!");
});

// API Documentation
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// List all Movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// Search by Title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    return res.status(200).json(movie);
  } else {
    res.status(400).send("Can't find a movie with that title!");
  }
});

// Search by Genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.filter((movie) => movie.Genre.Name === genreName);

  if (genre) {
    return res.status(200).json(genre);
  } else {
    res.status(400).send("Can't find a movie with that genre!");
  }
});

// Get the movies of the searched director
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.filter(
    (movie) => movie.Director.Name === directorName
  );

  if (director) {
    return res.status(200).json(director);
  } else {
    res.status(400).send("Can't find a director with that name!");
  }
});

// Information about the searched director
app.get("/movies/directors/info/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    return res.status(200).json(director);
  } else {
    res.status(400).send("Can't find a director with that name!");
  }
});

// returns the image link of the searched movie
app.get("/movies/:title/image/", (req, res) => {
  const { title } = req.params,
        image = movies.find((movie) => movie.title === title).imageURL;

  if (image) {
    return res.status(200).json(image);
  } else {
    res.status(400).send("Can't find a director with that name!");
  }
});

// Add User
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});


// Update User
app.put("/users/:id", (req, res) => {
  const  { id } = req.params;
  const  updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user!");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
  next();
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
