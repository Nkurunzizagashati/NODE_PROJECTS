const http = require("node:http");

const server = http.createServer((_, res) => {
  console.log("request received");
  while (1) {
    res.end("Hello\b\n");
  }
});

server.listen(1337);
console.log("Server is listening on port: 1337");
