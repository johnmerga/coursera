//import axios module
const axios = require("axios");
const { isObject } = require("./helper/check-object");

const jsonServerPort = require("../config").jsonServerPort;

//After starting the JSOn server check the port on which is running accordingly change
//the port in url given below

//This method will get all movies from json server
const getMovies = async (done) => {
  //   This url can be used - axios.get(`http://localhost:${jsonServerPort}/movies`)
  try {
    const response = await axios.get(
      `http://localhost:${jsonServerPort}/movies`
    );
    done(null, {
      STATUS: "OK",
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      done(
        {
          STATUS: "ERROR",
          message: error.message,
          statusCode: error.response.status,
        },
        null
      );
    } else {
      done(
        {
          STATUS: "ERROR",
          message: "json-server is not running",
          statusCode: 500,
        },
        null
      );
    }
  }
};

//This method will get specific movie id from json server
const getMovieById = async (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:${jsonServerPort}/movies/${movieId}`)
  try {
    const response = await axios.get(
      `http://localhost:${jsonServerPort}/movies/${+movieId}`
    );
    done(null, {
      STATUS: "OK",
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      done({
        STATUS: "error",
        message: error.message,
        statusCode: error.response.status || 500,
      });
    } else {
      done({
        STATUS: "error",
        message: "Server is not running",
        statusCode: 500,
      });
    }
  }
};

//This method will save Movie details in Json server
const saveMovieDetails = async (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:${jsonServerPort}/movies`, movieDetails)
  try {
    const requiredKeys = ["id", "movieName", "director", "rating"];
    const inputKeys = Object.keys(movieDetails);
    /* Checking if the movie title already exists in the database. */
    const doesMovieTitleExist = await axios.get(
      `http://localhost:${jsonServerPort}/movies/?movieName=${movieDetails.movieName}`
    );
    /* Checking if the movie id already exists in the database. */
    const doesMovieIDeExist = await axios.get(
      `http://localhost:${jsonServerPort}/movies/?id=${+movieDetails.id}`
    );
    /* Checking if the movieDetails is an object and if the required keys are in the input keys. */
    if (!isObject(movieDetails)) {
      done({
        STATUS: "error",
        message: "The input data is not an object",
        statusCode: 400,
      });
    } else if (
      /* Checking if the required keys are in the input keys. */
      !(
        requiredKeys.every((key) => inputKeys.includes(key)) &&
        inputKeys.every((key) => requiredKeys.includes(key))
      )
    ) {
      done({
        STATUS: "error",
        message: "The input field is not the same as the required field",
        statusCode: 400,
      });
    } else if (
      /* Checking if the movie title or movie id already exists in the database. */
      doesMovieTitleExist.data.length > 0 ||
      doesMovieIDeExist.data.length > 0
    ) {
      return done({
        STATUS: "error",
        message: "movie already exists or id already taken",
        statusCode: 400,
      });
    }
    // check if movie ratting is between 1 and 10
    else if (movieDetails.rating < 1 || movieDetails.rating > 10) {
      return done({
        STATUS: "error",
        message: "movie rating is not between 1 and 10",
        statusCode: 400,
      });
    } else {
      const response = await axios.post(
        `http://localhost:${jsonServerPort}/movies`,
        movieDetails
      );
      done(null, {
        STATUS: "OK",
        data: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      done({
        STATUS: "error",
        message: error.message,
        statusCode: error.response.status || 500,
      });
    } else {
      done({
        STATUS: "error",
        message: "Server is not running",
        statusCode: 500,
      });
    }
  }
};

//This method will update MovieDetails in Json Server
const updateMovieDetails = async (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:${jsonServerPort}/movies/${movieId}`, movieDetails)
  try {
    const requiredKeys = ["id", "movieName", "director", "rating"];
    const inputKeys = Object.keys(movieDetails);
    /* Checking if the movie id already exists in the database. */
    const doesMovieIDeExist = await axios.get(
      `http://localhost:${jsonServerPort}/movies/?id=${+movieId}`
    );
    /* Checking if the newMovie is an object and if the required keys are in the input keys. */
    if (!isObject(movieDetails)) {
      done({
        STATUS: "error",
        message: "The input data is not an object",
        statusCode: 400,
      });
    } else if (doesMovieIDeExist.data.length == 0) {
      /* Checking if the movie id already exists in the database. */
      return done({
        STATUS: "error",
        message: "movie does not exist",
        statusCode: 400,
      });
    } else if (
      /* Checking if the required keys are in the input keys. */
      !inputKeys.every((key) => requiredKeys.includes(key))
    ) {
      done({
        STATUS: "error",
        message: "The input fields didn't match the required fields",
        statusCode: 400,
      });
    } else if (
      movieDetails.rating &&
      (movieDetails.rating < 1 || movieDetails.rating > 10)
    ) {
      return done({
        STATUS: "error",
        message: "movie rating is not between 1 and 10",
        statusCode: 400,
      });
    } else {
      const oldMovie = await axios.get(
        `http://localhost:${jsonServerPort}/movies/${+movieId}`
      );
      delete movieDetails.id;
      inputKeys.forEach((key) => {
        oldMovie.data[key] = movieDetails[key];
      });
      const response = await axios.put(
        `http://localhost:${jsonServerPort}/movies/${+movieId}`,
        oldMovie.data
      );

      done(null, response.data);
    }
  } catch (error) {
    if (error.response) {
      done({
        STATUS: "error",
        message: error.message,
        statusCode: error.response.status || 500,
      });
    } else {
      done({
        STATUS: "error",
        message: "Server is not running",
        statusCode: 500,
      });
    }
  }
};

//This method will delete specific movie from Json Server
const deleteMovieById = async (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:${jsonServerPort}/movies/${movieId}`)
  try {
    const doesMovieIDeExist = await axios.get(
      `http://localhost:${jsonServerPort}/movies/?id=${+movieId}`
    );
    if (doesMovieIDeExist.data.length == 0) {
      return done({
        STATUS: "error",
        message: "movie does not exist",
        statusCode: 400,
      });
    } else {
      const response = await axios.delete(
        `http://localhost:${jsonServerPort}/movies/${+movieId}`
      );
      done(null, response.data);
    }
  } catch (error) {
    if (error.response) {
      done({
        STATUS: "error",
        message: error.message,
        statusCode: error.response.status || 500,
      });
    } else {
      done({
        STATUS: "error",
        message: "Server is not running",
        statusCode: 500,
      });
    }
  }
};

module.exports = {
  getMovies,
  getMovieById,
  saveMovieDetails,
  deleteMovieById,
  updateMovieDetails,
};
