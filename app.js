// import http from "http";

// const app = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.end(`<h1>Day la trang chu</h1>`);
//   }
//   if (req.url === "/about" && req.method === "GET") {
//     res.end(`<h1>Day la trang about</h1>`);
//   }
//   if (req.url === "/products" && req.method === "GET") {
//     res.end(`<h1>Day la trang san pham</h1>`);
//   }
// });

import express from "express";
const app = express();

// Request product list
app.get("/products", (req, res) => {
  res.end(`<h1>Day la trang san pham cua hoangnm</h1>`);
});

// Request details product
app.get("/products/:id", (req, res) => {
  // method, url, params, body, query
  console.log(req.params.id);
  res.end(`<h1>Day la trang chi tiet san pham co id la: ${req.params.id}</h1>`);
});

app.listen(8088, () => {
  console.log(`Server is running on port 8088`);
});
