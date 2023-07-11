import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { DB_URL } = process.env;

export const getAll = async (req, res) => {
  try {
    const { data } = await axios.get(`${DB_URL}/products`);
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
};

export const getDetail = async (req, res) => {
  try {
    const { data } = await axios.get(`${DB_URL}/products/${req.params.id}`);
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
};

export const create = async (req, res) => {
  try {
    const { data } = await axios.post(`${DB_URL}/products/`, req.body);
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
};

export const update = async (req, res) => {
  try {
    const { data } = await axios.put(
      `${DB_URL}/products/${req.params.id}`,
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
};

export const remove = async (req, res) => {
  try {
    const { status } = await axios.delete(
      `${DB_URL}/products/${req.params.id}`
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
};
