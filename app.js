import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const { PORT, API_URL } = process.env;
// destructuring

app.use(express.json());

// Request product list
app.get("/products", async (req, res) => {
  try {
    const { data } = await axios.get(`${API_URL}/products`);
    if (!data) {
      return res.status(404).json({
        message: "Products not found",
      });
    }
    return res.status(200).json({
      message: "Products successfully",
      products: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${req.params.id}`);
    if (!data) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product successfully",
      products: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { data } = await axios.post(`${API_URL}/products/`, req.body);
    if (!data) {
      return res.status(404).json({
        message: "Create Product not successful",
      });
    }
    return res.status(200).json({
      message: "Create Product successful",
      products: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/products/${req.params.id}`,
      req.body
    );
    if (!data) {
      return res.status(404).json({
        message: "Update Product not successful",
      });
    }
    return res.status(200).json({
      message: "Update Product successful",
      products: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { status } = await axios.delete(
      `${API_URL}/products/${req.params.id}`
    );

    if (!status || status !== 200) {
      return res.status(404).json({
        message: "Delete product not successful",
      });
    }
    return res.status(200).json({
      message: "Delete product successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
