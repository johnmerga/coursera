const { timeStamp } = require("console");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events").EventEmitter;

/**
 * RECOMMENDED:
 */
const demo = path.join(__dirname, ".", "demo.txt");
const logs = path.join(__dirname, "", "logs.txt");

const writableStream = fs.createWriteStream(logs);

const emitter = new EventEmitter();
/* Creating a new event listener for the event "change" and then it is creating a new date object and
then it is getting the year, month, day, hour, minute, and second from the date object and then it
is creating a new variable called timeStamp and then it is writing the timeStamp and the filename to
the writableStream. */
emitter.on("change", () => {
  const date = new Date();
  y = date.getFullYear();
  m = date.getMonth();
  d = date.getDate();
  h = date.getHours();
  mi = date.getMinutes();
  s = date.getSeconds();
  const timeStamp = `DATE: ${y}-${m}-${d} --- ${h}:${mi}:${s}`;
  writableStream.write(`${timeStamp}\n`);
});

fs.watch("demo.txt", (event, filename) => {
  emitter.emit("change", filename);
  if (event === "change") {
    console.log(`File ${filename} was changed`);
  } else {
    console.log(`File ${filename} was deleted`);
  }
});
