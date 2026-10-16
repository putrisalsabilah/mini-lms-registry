
const express = require("express");
const services = require("./services.json");

const app = express();
const PORT = 4000;

app.get("/api/registry/:name", (req, res) => {
  const name = req.params.name;
  const service = services[name];

  if (!service) {
    return res.status(404).json({
      error: "Service tidak ditemukan",
      name: name
    });
  }

  res.json({
    name: name,
    baseUrl: service.baseUrl,
    port: service.port
  });
});

app.listen(PORT, () => {
  console.log("Registry berjalan di port " + PORT);
});