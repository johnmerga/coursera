// Import the axios library
const axios = require("axios");
const { isObject } = require("./utils");

/**
 * It makes a GET request to the /movies endpoint of the API, and if the request is successful, it
 * calls the done callback with null as the first argument and the response data as the second
 * argument. If the request fails, it calls the done callback with an error object as the first
 * argument
 * @param done - This is a callback function that we will call when we are done with our request.
 */
const getMovies = async (done) => {
  // get all movies
  try {
    const response = await axios.get("http://localhost:3001/movies");
    done(null, response.data);
  } catch (err) {
    if (err.response) {
      done({
        status: "error",
        message: err.message,
        StatusCode: err.response.status || 500,
      });
    } else {
      done({
        status: "error",
        message: "Server is not running",
        StatusCode: 500,
      });
    }
  }
};

/**
 * It makes a GET request to the /movies/:id endpoint, and if the request is successful, it calls the
 * done callback with null and the response data. If the request fails, it calls the done callback with
 * an error object
 * @param movieId - The id of the movie to be fetched.
 * @param done - a callback function that will be called when the request is complete.
 */
const getMoviesById = async (movieId, done) => {
  // get movie by id
  try {
    const response = await axios.get(
      `http://localhost:3001/movies/${+movieId}`
    );
    done(null, response.data);
  } catch (error) {
    if (error.response) {
      done({
        status: "error",
        message: error.message,
        StatusCode: error.response.status || 500,
      });
    } else {
      done({
        status: "error",
        message: "Server is not running",
        StatusCode: 500,
      });
    }
  }
};

/**
 * It saves a movie to the database
 * @param newMovie - The movie object to be saved.
 * @param done - This is a callback function that is called when the function is done.
 * @returns a promise.
 */
const saveMovie = async (newMovie, done) => {
  // save the details of a movie read from the request body
  try {
    const requiredKeys = ["id", "movieName", "director", "rating"];
    const inputKeys = Object.keys(newMovie);
    /* Checking if the movie title already exists in the database. */
    const doesMovieTitleExist = await axios.get(
      `http://localhost:3001/movies/?movieName=${newMovie.movieName}`
    );
    /* Checking if the movie id already exists in the database. */
    const doesMovieIDeExist = await axios.get(
      `http://localhost:3001/movies/?id=${+newMovie.id}`
    );
    /* Checking if the newMovie is an object and if the required keys are in the input keys. */
    if (!isObject(newMovie)) {
      done({
        status: "error",
        message: "The input data is not an object",
        StatusCode: 400,
      });
    } else if (
      /* Checking if the required keys are in the input keys. */
      !(
        requiredKeys.every((key) => inputKeys.includes(key)) &&
        inputKeys.every((key) => requiredKeys.includes(key))
      )
    ) {
      done({
        status: "error",
        message: "The input data is not valid",
        StatusCode: 400,
      });
    } else if (
      /* Checking if the movie title or movie id already exists in the database. */
      doesMovieTitleExist.data.length > 0 ||
      doesMovieIDeExist.data.length > 0
    ) {
      return done({
        status: "error",
        message: "movie already exists or id already taken",
        StatusCode: 400,
      });
    }
    // check if movie ratting is between 1 and 10
    else if (newMovie.rating < 1 || newMovie.rating > 10) {
      return done({
        status: "error",
        message: "movie rating is not between 1 and 10",
        StatusCode: 400,
      });
    } else {
      const response = await axios.post(
        "http://localhost:3001/movies",
        newMovie
      );
      done(null, response.data);
    }
  } catch (error) {
    if (error.response) {
      done({
        status: "error",
        message: error.message,
        StatusCode: error.response.status || 500,
      });
    } else {
      done({
        status: "error",
        message: "Server is not running",
        StatusCode: 500,
      });
    }
  }
};

/**
 * It updates a movie in the database
 * @param movieId - The id of the movie to be updated.
 * @param updateData - The data that you want to update the movie with.
 * @param done - A callback function that is called when the function is done.
 * @returns the updated movie.
 */
const updateMovie = async (movieId, updateData, done) => {
  try {
    const requiredKeys = ["id", "movieName", "director", "rating"];
    const inputKeys = Object.keys(updateData);
    /* Checking if the movie id already exists in the database. */
    const doesMovieIDeExist = await axios.get(
      `http://localhost:3001/movies/?id=${+movieId}`
    );
    /* Checking if the newMovie is an object and if the required keys are in the input keys. */
    if (!isObject(updateData)) {
      done({
        status: "error",
        message: "The input data is not an object",
        StatusCode: 400,
      });
    } else if (doesMovieIDeExist.data.length == 0) {
      /* Checking if the movie id already exists in the database. */
      return done({
        status: "error",
        message: "movie does not exist",
        StatusCode: 400,
      });
    } else if (
      /* Checking if the required keys are in the input keys. */
      !inputKeys.every((key) => requiredKeys.includes(key))
    ) {
      done({
        status: "error",
        message: "The input fields didn't match the required fields",
        StatusCode: 400,
      });
    } else if (
      updateData.rating &&
      (updateData.rating < 1 || updateData.rating > 10)
    ) {
      return done({
        status: "error",
        message: "movie rating is not between 1 and 10",
        StatusCode: 400,
      });
    } else {
      const oldMovie = await axios.get(
        `http://localhost:3001/movies/${+movieId}`
      );
      delete updateData.id;
      inputKeys.forEach((key) => {
        oldMovie.data[key] = updateData[key];
      });
      const response = await axios.put(
        `http://localhost:3001/movies/${+movieId}`,
        oldMovie.data
      );

      done(null, response.data);
    }
  } catch (error) {
    if (error.response) {
      done({
        status: "error",
        message: error.message,
        StatusCode: error.response.status || 500,
      });
    } else {
      done({
        status: "error",
        message: "Server is not running",
        StatusCode: 500,
      });
    }
  }
};

/**
 * It checks if the movie exists, if it does, it deletes it, if it doesn't, it returns an error
 * @param movieId - The id of the movie to be deleted
 * @param done - This is a callback function that is called when the function is done.
 * @returns a promise.
 */
const deleteMovieById = async (movieId, done) => {
  try {
    const doesMovieIDeExist = await axios.get(
      `http://localhost:3001/movies/?id=${+movieId}`
    );
    if (doesMovieIDeExist.data.length == 0) {
      return done({
        status: "error",
        message: "movie does not exist",
        StatusCode: 400,
      });
    } else {
      const response = await axios.delete(
        `http://localhost:3001/movies/${+movieId}`
      );
      done(null, response.data);
    }
  } catch (error) {
    if (error.response) {
      done({
        status: "error",
        message: error.message,
        StatusCode: error.response.status || 500,
      });
    } else {
      done({
        status: "error",
        message: "Server is not running",
        StatusCode: 500,
      });
    }
  }
};

module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById,
};
