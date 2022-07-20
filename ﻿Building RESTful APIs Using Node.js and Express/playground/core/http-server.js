const { rejects } = require("assert");
const http = require("http");

const user = {
  name: "john",
  age: 33,
};
const { resolve } = require("path");

const server = http.createServer(async (req, res) => {
  if (req.url == "/user/1" && req.method == "GET") {
    res.writeHead(200, {
      "content-type": "text/json",
    });

    res.end(JSON.stringify(user));
  } else if (req.url == "/user/1" && req.method == "POST") {
    const input = await getData(req);
    res.writeHead(201, {
      "content-type": "text/json",
    });
    res.end(input);
  }
});
server.on("error", (err) => {
  console.log("something is wrong with the sever");
});
server.listen(3000, () => {
  console.log("server is up");
});

// gets data
const getData = (req) =>
  new Promise((resolve, rejects) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      rejects(error);
    }
  });
