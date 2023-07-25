import dotenv from "dotenv";
import Category from "../models/Category.js";
import categoryValidator from '../validations/category';
dotenv.config();

export const getAll = async (req, res) => {
  try {
    // Không cần thiết phải lấy chi tiết danh mục trong phần get All categories, giảm perfomance của services
    const data = await Category.find({})
    if (!data && data.length === 0) {
      return res.status(404).json({
        message: "Categories not found",
      });
    }
    return res.status(200).json({
      message: "Categories successfully",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const data  = await Category.findById(req.params.id).populate("products")
    if (!data) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({
      message: "Category successfully",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message || "Please re-check your data!",
      });
    }
    const data = await Category.create(req.body)
    if (!data) {
      return res.status(404).json({
        message: "Create Category not successful",
      });
    }
    return res.status(200).json({
      message: "Create Category successful",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message || "Please re-check your data!",
      });
    }

    const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true})

    if (!data) {
      return res.status(404).json({
        message: "Update Category not successful",
      });
    }

    return res.status(200).json({
      message: "Update Category successful",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id)
    
    if (!data) {
      return res.status(404).json({
        message: "Delete category not successful",
      });
    }
    return res.status(200).json({
      message: "Delete category successful",
      data
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
