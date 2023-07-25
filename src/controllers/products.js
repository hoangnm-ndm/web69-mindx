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
    // const data  = await Product.find({ _id: id})
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
    const updateCategories = await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id
      }
    })
    
    // Sau này sẽ xử lý trường hợp không thể thêm danh mục thành công thì add sản phẩm vào danh mục mặc định
    if(!updateCategories) {
      return res.status(404).json({
        message: "Add a category for the product that is having the error",
      });
    }

    // Cập nhật cả category tương ứng với sản phẩm đã được thêm.
    console.log(Product.categoryId)
    await Category.findByIdAndUpdate(Product.categoryId)
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

    // Cập nhật cả category tương ứng với sản phẩm đã được thêm.
    await Category.findByIdAndUpdate(Product.categoryId)
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
    // Cập nhật cả category tương ứng với sản phẩm đã được thêm.
    await Category.findByIdAndUpdate(Product.categoryId)
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
