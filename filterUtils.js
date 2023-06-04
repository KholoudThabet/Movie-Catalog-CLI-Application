export const filterMoviesByYear = (movies, year) => {
    const filteredMovies = movies.filter((movie) => movie.year === year);
    console.log(filteredMovies);
  };
  
  export const filterMoviesByGenre = (movies, genre) => {
    const filteredMovies = movies.filter((movie) => movie.genre === genre);
    console.log(filteredMovies);
  };
  
  