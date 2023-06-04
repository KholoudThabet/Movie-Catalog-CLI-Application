import fs from "fs";

export const readMoviesFromJSON = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const movies = JSON.parse(data);
          resolve(movies);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

export const writeMoviesToJSON = (filename, movies) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(movies), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
