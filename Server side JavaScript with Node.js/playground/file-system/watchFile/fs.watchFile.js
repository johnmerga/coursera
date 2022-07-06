const fs = require("fs");

/**
 * NOT RECOMMENDED:
 */
fs.watchFile('demo.txt', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});