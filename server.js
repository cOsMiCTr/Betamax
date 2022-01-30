

const express = require("express"),
  morgan = require("morgan"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());

// Movies Databank
let movies = [{
    Title: "The Dark Knight",
    Description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations.",
      BirthYear: 1970,
      DeathYear: ""
    },
    ReleaseDate: "2008-07-14",
    Genre: { Name:"Action", Description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."},
    ImageURL: "https://m.media-amazon.com/images/I/91KkWf50SoL._SL1500_.jpg",
    Featured: true
  },

{
    Title: "The Lord of the Rings: The Return of the King",
    Description:
      "Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Director: {
      Name: "Peter Jackson",
      Bio: "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter, and film producer.",
      BirthYear: 1961,
      DeathYear: ""
    },
    ReleaseDate: "2003-12-01",
    Genre: { Name:"Fantasy", Description: "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."},
    ImageURL: "https://m.media-amazon.com/images/I/81kUINEtUbL._SL1408_.jpg",
    Featured: true
  },
 
{
    Title: "Inception",
    Description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations.",
      BirthYear: 1970,
      DeathYear: ""
    },
    ReleaseDate: "2010-07-01",
    Genre: ["Action"],
    ImageURL: "https://m.media-amazon.com/images/I/71SBgi0X2KL._SL1200_.jpg",
    Featured: true
  },

 {
    Title: "Matrix",
    Description:
      "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    Director: {
      Name: "Lana Wachowski",
      Bio: "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly.",
      BirthYear: 1965,
      DeathYear: ""
    },
    ReleaseDate: "1999-06-17",
    Genre: { Name:"Action", Description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."},
    ImageURL: "https://m.media-amazon.com/images/I/71D8+NFLZmL._SL1500_.jpg",
    Featured: true
  },
{
    Title: "Back to the Future",
    Description:
      "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    Director: {
      Name: "Robert Zemeckis",
      Bio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert\'s earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)).",
      BirthYear: 1951,
      DeathYear: ""
    },
    ReleaseDate: "1985-10-03",
    Genre: { Name:"Action", Description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."},
    ImageURL: "https://m.media-amazon.com/images/I/51th2-bmq-L.jpg",
    Featured: true
  },
{
    Title: "Saving Private Ryan",
    Description:
      "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    Director: {
      Name: "Steven Spielberg",
      Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood\'s best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
      BirthYear: 1946,
      DeathYear: ""
    },
    ReleaseDate: "1998-10-08",
    Genre: { Name:"Drama", Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."},
    ImageURL: "https://m.media-amazon.com/images/I/417Tz4B7YIL.jpg",
    Featured: true
  },
 {
    Title: "The Shawshank Redemption",
    Description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Director: {
      Name: "Frank Darabont",
      Bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School.",
      BirthYear: 1959,
      DeathYear: ""
    },
    ReleaseDate: "1995-03-09",
    Genre: { Name:"Drama", Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."},
    ImageURL: "https://m.media-amazon.com/images/I/51wdGaBba1L._AC_.jpg",
    Featured: true
  },
  {
    Title: "Alien",
    Description:
      "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
    Director: {
      Name: "Ridley Scott",
      Bio: "Described by film producer Michael Deeley as the very best eye in the business, director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear (then County Durham). His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe before they eventually returned to Teesside.",
      BirthYear: 1937,
      DeathYear: ""
    },
    ReleaseDate: "2003-10-23",
    Genre: { Name:"Horror", Description: "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes."},
    ImageURL: "https://m.media-amazon.com/images/I/91jUuRKZlvL._SL1500_.jpg",
    Featured: true
  },
 {
    Title: "Avengers: Endgame",
    Description:
      "fter the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.",
    Director: {
      Name: "Anthony Russo",
      Bio: "Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo. They have directed You, Me and Dupree, Cherry and the Marvel films Captain America: The Winter Soldier, Captain America: Civil War, Avengers: Infinity War and Avengers: Endgame. Endgame is one of the highest grossing films of all time.",
      BirthYear: 1970,
      DeathYear: ""
    },
    ReleaseDate: "2019-04-24",
    Genre: { Name:"Superhero", Description: "A superhero film (or superhero movie) is a film that focuses on the actions of superheroes: individuals who usually possess extraordinary – generally superhuman – abilities and are dedicated to protecting the public."},
    ImageURL: "https://m.media-amazon.com/images/I/71s4OWUH2oL._SL1200_.jpg",
    Featured: true
  },
 {
    Title: "Rocky",
    Description:
      "Rocky is a 1976 American sports drama film written by and starring Sylvester Stallone, and directed by John G. Avildsen.[4] It tells the rags to riches American Dream story of Rocky Balboa (Stallone), an uneducated, kind-hearted working class Italian-American and small-time club fighter who, while working as a debt collector for a loan shark in the slums of Philadelphia, gets a shot at the world heavyweight championship.",
    Director: {
      Name: "John G. Avildsen",
      Bio: "John Guilbert Avildsen was an American film director. He is perhaps best known for directing Rocky (1976), which earned him the Academy Award for Best Director, and the first three The Karate Kid films.",
      BirthYear: 2017,
      DeathYear: ""
    },
    ReleaseDate: "1976-11-21",
    Genre: { Name:"Drama", Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)."},
    ImageURL: "https://m.media-amazon.com/images/I/51AP5MY2B5L.jpg",
    Featured: true
  },


 {
    Title : "Silence of the Lambs",
    Description : "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre : {
      Name : "Thriller",
      Description : "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
    },
    Director : {
      Name : "Jonathan Demme",
      Bio : "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      BirthYear : "1944",
      DeathYear : "2017"
    },
    ImageURL : "silenceofthelambs.png",
    Featured : true,
    Actors : [
        "Anthony Hopkins",
        "Jodie Foster"
    ]
  }];

let users = [
  {

    Username: "Tony",
    Password: "test123",
    Email:"Tony@Tony.com",
    Birthday: "1985-02-19",
    favoriteMovies: []
  },
  {

    Username: "Carla",
    Password: "test123",
    Email:"Carla@gmail.com",
    Birthday: "1988-10-25",
    favoriteMovies: []
  },
  {

    Username: "Henry",
    Password: "test123",
    Email:"Henry@gmail.com",
    Birthday: "1979-05-12",
    favoriteMovies: []
},
{

  Username: "John",
  Password: "test123",
  Email:"John@gmail.com",
  Birthday: "1982-01-02",
  favoriteMovies: []
},
{

  Username: "Onur",
  Password: "test123",
  Email:"Onur@gmail.com",
  Birthday: "1980-08-31",
  favoriteMovies: []
}];

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

// "Get Movies by Title"
app.get("/movies/:Title", (req, res) => {
  const { Title } = req.params;
  const movie = movies.find((movie) => movie.Title === Title);

  if (movie) {
    return res.status(200).json(movie);
  } else {
    res.status(400).send("Can't find a movie with that Title!");
  }
});

// Filter Movies with Genre
app.get("/movies/genre/:genre", (req, res) => {
  const { genre } = req.params;
  const genres = movies.filter((movie) => {
    let arrayOfGenres = movie.Genre;
    return arrayOfGenres.some((element) => element === genre);
  });

  if (genres) {
    return res.status(200).json(genres);
  } else {
    res.status(400).send("Can't find a movie with that genre!");
  }
});

// Filter Movies with Director
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

// Director info by name
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
app.get("/movies/:Title/image/", (req, res) => {
  const { Title } = req.params,
    image = movies.find((movie) => movie.Title === Title).ImageURL;

  if (image) {
    return res.status(200).json(image);
  } else {
    res.status(400).send("Can't find a director with that name!");
  }
});

// List all Users
app.get("/users/all", (req, res) => {
  res.status(200).json(users);
});

// Add new user
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

// Update new user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.username = updatedUser.username;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user!");
  }
});

// Delete an existing user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);
  let userName = user.username;
  if (user) {
    users = users.filter((user) => user.id != id);
    res
      .status(200)
      .json("Username " + userName + " has been successfully deleted!");
  } else {
    res.status(400).send("No such user!");
  }
});

// Add FavMovie to user
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  // Movie control
  let movieToSearch = movies.find((movie) => movie.Title == movieTitle);

  // Multiple entry control under the user
  let existingMovie = user.favoriteMovies.some(
    (element) => element === movieToSearch.Title
  );

  if (user) {
    if (movieToSearch) {
      if (!existingMovie) {
        user.favoriteMovies.push(movieToSearch.Title);
        res
          .status(200)
          .json(
            "The movie " +
              movieToSearch.Title +
              " has been added to the user " +
              user.username
          );
      } else {
        res
          .status(400)
          .send(
            "The movie " +
              movieToSearch.Title +
              " alredy exists in to the favorites list of this user " +
              user.username
          );
      }
    } else {
      res.status(400).send("Can't find any movie with that Title!");
    }
  } else {
    res.status(400).send("There is no such user!");
  }
});

// Delete FavMovie from user
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  // Movie control
  let movieToSearch = movies.find((movie) => movie.Title == movieTitle);

  // Existing movie control
  let existingMovie = user.favoriteMovies.some(
    (element) => element === movieToSearch.Title
  );

  if (user) {
    if (movieToSearch) {
      if (existingMovie) {
        user.favoriteMovies = user.favoriteMovies.filter(
          (Title) => Title !== movieToSearch.Title
        );
        res
          .status(200)
          .json(
            "The movie " +
              movieToSearch.Title +
              " has been removed from the user " +
              user.name
          );
      } else {
        res
          .status(400)
          .send("There is no such movie under the favorites list of this user");
      }
    } else {
      res.status(400).send("Can't find a movie with that Title!");
    }
  } else {
    res.status(400).send("There is no such user!");
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
