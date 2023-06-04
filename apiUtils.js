import axios from "axios";
import { Movie } from "./movie.js";

export const fetchMoviesFromAPI = async () => {
  try {
    const response = await axios.get("https://api.example.com/movies");
    const moviesData = response.data;
    const movies = moviesData.map((movieData) => {
      const { id, title, director, year, genre } = movieData;
      return new Movie(id, title, director, year, genre);
    });
    return movies;
  } catch (error) {
    throw new Error("Failed to fetch movies from API.");
  }
};
