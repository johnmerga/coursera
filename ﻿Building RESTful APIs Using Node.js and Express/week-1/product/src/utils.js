const getRequestData = (req) => {
  // Write logic here to read the request body data
  return new Promise((resolve, reject) => {
    let body = "";
    req
      .on("data", (chunk) => {
        body += chunk;
      })
      .on("end", () => {
        resolve(JSON.parse(body.toString()));
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const writeHead = (res, status) =>
  res.writeHead(+status, {
    "content-type": "application/json",
  });

module.exports = { getRequestData, writeHead };
