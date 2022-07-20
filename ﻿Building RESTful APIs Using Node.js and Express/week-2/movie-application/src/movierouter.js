const router = require("express").Router();
const { json } = require("express");
//import all the modules required
const movieController = require("./moviecontroller");

/**
 * API to get the details of all movies
 * EFFECTIVE URL: GET /api/v1/movies
 */

router.get("/", (req, res) => {
  try {
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.getMovies((err, results) => {
      if (err) {
        res.status(err.statusCode).json(err);
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    res.status(500).json({
      STATUS: "ERROR",
      message: "Server Error",
      statusCode: 500,
    });
  }
});
/**
 * API to get the details of specific movie
 * EFFECTIVE URL: GET /api/v1/movie/:movieId
 */
//
router.get("/:movieId", (req, res) => {
  try {
    //retreive moviedId from req.params

    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    const movieId = req.params.movieId;
    movieController.getMovieById(movieId, (err, results) => {
      if (err) {
        res.status(err.statusCode).json(err);
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    res.status(500).json({
      STATUS: "ERROR",
      message: "Server Error",
      statusCode: 500,
    });
  }
});

/**
 * API to save new movie
 * EFFECTIVE URL: POST /api/v1/movies
 */
router.post("/", (req, res) => {
  try {
    //retreive movieDetails from req.body
    const movieDetails = req.body;
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if (err) {
        res.status(err.statusCode).json(err);
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    res.status(500).json({
      STATUS: "ERROR",
      message: "Server Error",
      statusCode: 500,
    });
  }
});

/**
 * API to edit movie detail
 * EFFECTIVE URL: PATCH /api/v1/movies/:movieId
 */
router.patch("/:movieId", (req, res) => {
  try {
    //retreive moviedId from req.params

    //retreive movieDetails from req.body
    const movieId = req.params.movieId;
    const movieDetails = req.body;
    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    movieController.updateMovieDetails(
      movieId,
      movieDetails,
      (err, results) => {
        if (err) {
          res.status(err.statusCode).json(err);
        } else {
          res.json(results);
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      STATUS: "ERROR",
      message: "Server Error",
      statusCode: 500,
    });
  }
});

/**
 * API to delete movie
 * EFFECTIVE URL: DELETE /api/v1/movies/:movieId
 */
router.delete("/:movieId", (req, res) => {
  try {
    //retrieve moviesId from req.params

    //calling controller method and passing the parameters
    //return the response as per error or result coming from controller
    const movieId = req.params.movieId;
    movieController.deleteMovieById(movieId, (err, results) => {
      if (err) {
        res.status(err.statusCode).json(err);
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    res.status(500).json({
      STATUS: "ERROR",
      message: "Server Error",
      statusCode: 500,
    });
  }
});

module.exports = router;
