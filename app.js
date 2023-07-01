import express from "express";
const app = express();

const products = [
  {
    id: "123",
    name: "San pham A",
    price: 200,
    desc: "Mo ta cho san pham A",
  },
  {
    id: "234",
    name: "San pham B",
    price: 200,
    desc: "Mo ta cho san pham B",
  },
  {
    id: "456",
    name: "San pham C",
    price: 200,
    desc: "Mo ta cho san pham C",
  },
];

// json-server

// Request product list
app.get("/products", (req, res) => {
  // res.end(`<h1>Day la trang san pham cua hoangnm</h1>`);
  // JSON
  // res.end(JSON.stringify(products));
  // res.json(products);
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
