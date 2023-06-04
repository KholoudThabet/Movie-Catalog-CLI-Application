export const searchMovieByTitle = (movies, title) => {
    const foundMovies = movies.filter((movie) => movie.title === title);
    console.log(foundMovies);
  };
  
  export const searchMovieByDirector = (movies, director) => {
    const foundMovies = movies.filter((movie) => movie.director === director);
    console.log(foundMovies);
  };

    
  export const searchMovieByGenre = (movies, genre) => {
    const foundMovies = movies.filter((movie) => movie.genre === genre);
    console.log(foundMovies);
  };

  