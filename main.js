import prompt from "prompt-sync";
import { readMoviesFromJSON, writeMoviesToJSON } from "./fileUtils.js";
import { fetchMoviesFromAPI } from "./apiUtils.js";
import { Movie } from "./movie.js";
import {
  searchMovieByTitle,
  searchMovieByDirector,
  searchMovieByGenre,
} from "./searchUtils.js";
import { filterMoviesByYear, filterMoviesByGenre } from "./filterUtils.js";

const input = prompt();

const printMenu = () => {
  console.log(`
    *********************************
     Select an action:
      1) Display Movies Catalog
      2) Add new Movie (title, director, year , genre)
      3) Update a Movie (title, director, year , genre)
      4) Delete a Movie by (title or director or year or genre)
      5) Search for a Movie by (title or director or year or genre)
      6) Filter Movies by (year or genre)
      7) Fetch Movies from API and save them to the DB
      0) Exit
    *********************************
  `);
};

const randomID = () => {
  return Math.floor(Math.random() * 1000);
};

let movies = [];

readMoviesFromJSON("movies.json")
  .then((data) => {
    movies = data;
    console.log(movies);
    startProgram();
  })
  .catch((err) => {
    console.log(`Error reading file from disk: ${err}`);
  });

const startProgram = () => {
  while (true) {
    printMenu();
    const choice = input("Enter Choice Number:");
    switch (choice) {
      case "1":
        console.log(movies);
        break;
      case "2":
        addMovie();
        break;
      case "3":
        updateMovie();
        break;
      case "4":
        deleteMovie();
        break;
      case "5":
        searchMovie();
        break;
      case "6":
        filterMovies();
        break;
      case "7":
        fetchMovies();
        break;
      case "0":
        return;
      default:
        break;
    }
  }
};

const addMovie = () => {
  const title = input("Enter movie title: ");
  const director = input("Enter movie director: ");
  const year = input("Enter movie year: ");
  const genre = input("Enter movie genre: ");
  const newMovie = new Movie(randomID(), title, director, year, genre);
  movies.push(newMovie);
  writeMoviesToJSON("movies.json", movies)
    .then(() => {
      console.log("Movie added successfully!");
    })
    .catch((err) => {
      console.log(`Error writing file: ${err}`);
    });
};

const updateMovie = () => {
  const choice = input("Enter update by title or director or year or genre: ");
  switch (choice) {
    case "title":
      updateMovieByTitle();
      break;
    case "director":
      updateMovieByDirector();
      break;
    case "year":
      updateMovieByYear();
      break;
    case "genre":
      updateMovieByGenre();
      break;
    default:
      break;
  }
};

const updateMovieByTitle = () => {
  const title = input("Enter movie title: ");
  const index = movies.findIndex((movie) => movie.title === title);
  console.log("Movie ID:", movies[index].id);
  if (index !== -1) {
    const newTitle = input("Enter new movie title: ");
    movies[index].title = newTitle;
    writeMoviesToJSON("movies.json", movies)
      .then(() => {
        console.log("Movie updated successfully!");
      })
      .catch((err) => {
        console.log(`Error writing file: ${err}`);
      });
  } else {
    console.log("Movie not found!");
  }
};

// Implement other update functions similarly

const deleteMovie = () => {
  const choice = input("Enter delete by title or director or year or genre: ");
  switch (choice) {
    case "title":
      deleteMovieByTitle();
      break;
    case "director":
      deleteMovieByDirector();
      break;
    case "year":
      deleteMovieByYear();
      break;
    case "genre":
      deleteMovieByGenre();
      break;
    default:
      break;
  }
};

const  deleteMovieByDirector = () => {
  const director = input("Enter movie Director: ");
  const index = movies.findIndex((movie) => movie.director === director);
  if (index !== -1) {
    movies.splice(index, 1);
    writeMoviesToJSON("movies.json", movies)
      .then(() => {
        console.log("Movie deleted successfully!");
      })
      .catch((err) => {
        console.log(`Error writing file: ${err}`);
      });
  } else {
    console.log("Movie not found!");
  }
};

const deleteMovieByTitle = () => {
    const title = input("Enter movie title: ");
    const index = movies.findIndex((movie) => movie.title === title);
    if (index !== -1) {
      movies.splice(index, 1);
      writeMoviesToJSON("movies.json", movies)
        .then(() => {
          console.log("Movie deleted successfully!");
        })
        .catch((err) => {
          console.log(`Error writing file: ${err}`);
        });
    } else {
      console.log("Movie not found!");
    }
  };

  const deleteMovieByYear = () => {
    const year = input("Enter movie Year: ");
    const index = movies.findIndex((movie) => movie.year === year);
    if (index !== -1) {
      movies.splice(index, 1);
      writeMoviesToJSON("movies.json", movies)
        .then(() => {
          console.log("Movie deleted successfully!");
        })
        .catch((err) => {
          console.log(`Error writing file: ${err}`);
        });
    } else {
      console.log("Movie not found!");
    }
  };
  const deleteMovieByGenre = () => {
    const genre = input("Enter movie Genre: ");
    const index = movies.findIndex((movie) => movie.genre === genre);
    if (index !== -1) {
      movies.splice(index, 1);
      writeMoviesToJSON("movies.json", movies)
        .then(() => {
          console.log("Movie deleted successfully!");
        })
        .catch((err) => {
          console.log(`Error writing file: ${err}`);
        });
    } else {
      console.log("Movie not found!");
    }
  };



const searchMovie = () => {
  const choice = input("Enter search by title or director or year or genre: ");
  switch (choice) {
    case "title":
      searchMovieByTitle(movies, input("Enter movie title: "));
      break;
    case "director":
      searchMovieByDirector(movies, input("Enter movie director: "));
      break;
  
    case "genre":
      searchMovieByGenre(movies, input("Enter movie genre: "));
      break;
    default:
      break;
  }
};

const filterMovies = () => {
  const choice = input("Enter filter by year or genre: ");
  switch (choice) {
    case "year":
      filterMoviesByYear(movies, input("Enter movie year: "));
      break;
    case "genre":
      filterMoviesByGenre(movies, input("Enter movie genre: "));
      break;
    default:
      break;
  }
};

const fetchMovies = async () => {
  try {
    const fetchedMovies = await fetchMoviesFromAPI();
    movies.push(...fetchedMovies);
    writeMoviesToJSON("movies.json", movies)
      .then(() => {
        console.log("Movies fetched and saved successfully!");
      })
      .catch((err) => {
        console.log(`Error writing file: ${err}`);
      });
  } catch (error) {
    console.log(`Error fetching movies: ${error}`);
  }
};
