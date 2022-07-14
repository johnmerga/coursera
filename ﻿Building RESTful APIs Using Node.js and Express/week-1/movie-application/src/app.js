// Import the required dependencies
const http = require("http");
const {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById,
} = require("./moviesService");
const { getRequestData, headerStatus } = require("./utils");

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if (req.url === "/api/v1/movies" && req.method === "GET") {
    getMovies((err, movies) => {
      if (err) {
        headerStatus(err.StatusCode, res);
        res.end(JSON.stringify(err));
      } else {
        headerStatus(200, res);
        res.end(JSON.stringify(movies));
      }
    });
  }
  // Get a movie with specified id
  else if (
    req.url.match(/^\/api\/v1\/movies\/([a-zA-Z0-9]+)$/) &&
    req.method === "GET"
  ) {
    try {
      const id = req.url.split("/")[4];
      getMoviesById(id, (err, movie) => {
        if (err) {
          headerStatus(err.StatusCode, res);
          res.end(JSON.stringify(err));
        } else {
          headerStatus(200, res);
          res.end(JSON.stringify(movie));
        }
      });
    } catch (error) {
      headerStatus(500, res);
      res.end(JSON.stringify({ status: "error", message: error.message }));
    }
  }
  // Save movie details
  else if (req.url === "/api/v1/movies" && req.method === "POST") {
    try {
      const body = await getRequestData(req);
      const newMovie = JSON.parse(body);
      saveMovie(newMovie, (err, movie) => {
        if (err) {
          headerStatus(err.StatusCode, res);
          res.end(JSON.stringify(err));
        } else {
          headerStatus(200, res);
          res.end(JSON.stringify(movie));
        }
      });
    } catch (error) {
      headerStatus(500, res);
      res.end("my error");
    }
  }
  // Update a specific movie
  else if (
    req.url.match(/^\/api\/v1\/movies\/([a-zA-Z0-9]+)$/) &&
    req.method === "PUT"
  ) {
    try {
      const id = req.url.split("/")[4];
      const body = await getRequestData(req);
      const updatedMovie = JSON.parse(body);
      updateMovie(id, updatedMovie, (err, movie) => {
        if (err) {
          headerStatus(err.StatusCode, res);
          res.end(JSON.stringify(err));
        } else {
          headerStatus(200, res);
          res.end(JSON.stringify(movie));
        }
      });
    } catch (error) {
      headerStatus(500, res);
      res.end(JSON.stringify({ status: "error", message: error.message }));
    }
  }
  // Delete a specific movie
  else if (
    req.url.match(/^\/api\/v1\/movies\/([a-zA-Z0-9]+)$/) &&
    req.method === "DELETE"
  ) {
    try {
      const id = req.url.split("/")[4];
      deleteMovieById(id, (err, movie) => {
        if (err) {
          headerStatus(err.StatusCode, res);
          res.end(JSON.stringify(err));
        } else {
          headerStatus(200, res);
          res.end(JSON.stringify(movie));
        }
      });
    } catch (error) {
      headerStatus(500, res);
      res.end(JSON.stringify({ status: "error", message: error.message }));
    }
  }
  // If the request is not supported
  else {
    headerStatus(404, res);
    res.end(
      JSON.stringify({
        status: "error",
        message: "this path is not supported",
        StatusCode: 404,
      })
    );
  }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
