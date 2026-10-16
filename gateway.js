
const http = require("http");

const SERVICE_NAME = "course-service";

const REGISTRY_URL =
  "http://localhost:4000/api/registry/" + SERVICE_NAME;

http.get(REGISTRY_URL, (registryRes) => {
  let data = "";

  registryRes.on("data", (chunk) => {
    data += chunk;
  });

  registryRes.on("end", () => {
    const service = JSON.parse(data);

    if (registryRes.statusCode !== 200) {
      console.log("Service tidak ditemukan:", service);
      return;
    }

    console.log("Service ditemukan:", service.name);
    console.log("Alamat tujuan:", service.baseUrl);

    http.get(service.baseUrl, (serviceRes) => {
      let response = "";

      serviceRes.on("data", (chunk) => {
        response += chunk;
      });

      serviceRes.on("end", () => {
        console.log("Respons service:", response);
      });
    }).on("error", (err) => {
      console.log("Gagal menghubungi service:", err.message);
    });
  });
}).on("error", (err) => {
  console.log("Gagal menghubungi Registry:", err.message);
});