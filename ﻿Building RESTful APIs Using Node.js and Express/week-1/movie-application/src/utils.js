const getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    // Write logic to read the request body data here
    let body = "";
    req
      .on("data", (chunk) => {
        body += chunk.toString();
      })
      .on("end", () => {
        resolve(body);
      })
      .on("error", (err) => {
        reject({
          status: "error",
          message:
            err.message ||
            "Something went wrong" +
              "something went wrong while reading the request body",
          StatusCode: err.response.status || 500,
        });
      });
  });
};
const headerStatus = (status, res) => {
  return res.writeHead(status, {
    "Content-Type": "application/json",
  });
};

const isObject = (obj) => {
  return obj !== null && typeof obj === "object";
};

module.exports = { getRequestData, headerStatus, isObject };
