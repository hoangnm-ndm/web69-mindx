import dotenv from "dotenv";
import productValidator from "../validations/product.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
dotenv.config();

export const getAll = async (req, res) => {
  try {
    const data = await Product.find({}).populate("categoryId")
    if (!data && data.length === 0) {
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
    const data  = await Product.findById(req.params.id).populate("categoryId")
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
    const { error } = productValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message || "Please re-check your data!",
      });
    }
    const data = await Product.create(req.body)
    if (!data) {
      return res.status(404).json({
        message: "Create Product not successful",
      });
    }

    const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id
      }
    })

    if(!updateCategory) {
      return res.status(404).json({
        message: "Update category not successful",
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
    const { error } = productValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message || "Please re-check your data!",
      });
    }

    const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true})
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
    const data = await Product.findByIdAndDelete(req.params.id)

    if (!data) {
      return res.status(404).json({
        message: "Delete product not successful",
      });
    }
    return res.status(200).json({
      message: "Delete product successful",
      data
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
