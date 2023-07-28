// This is the solution to the backend intermediate challenge for KODECAMO
const http = require("http");
const fs = require("fs");

const PORT = 5050;

// Middleware function to log requests
function requestMiddleware(req, res, next) {
  console.log(`Incoming Request is:  ${req.method} ${req.url}`);
  next();
}

const server = http.createServer((req, res) => {
  // Apply the middleware to all routes
  requestMiddleware(req, res, () => {
    if (req.url === "/file") {
      // Task 2 code - Read and serve file
      fs.readFile("data.txt", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error reading the file");
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(data);
        }
      });
    } else if (req.url === "/api/user") {
      // Task 3 code - JSON API
      const user = {
        name: "Bolarinwa Ahmed",
        email: "bolarinwaahmed22@gmail.com",
        age: 321,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello, KodeCamp");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
