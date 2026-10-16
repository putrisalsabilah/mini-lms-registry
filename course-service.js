
const http = require("http");

const PORT = 3010;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    message: "Course Service berhasil diakses",
    courses: ["Pemrograman", "Basis Data"]
  }));
});

server.listen(PORT, () => {
  console.log("Course Service berjalan di port " + PORT);
});