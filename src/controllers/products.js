import dotenv from "dotenv";
import productValidator from "../validations/products.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
dotenv.config();

export const getAll = async (req, res) => {
  // Phân trang
  // Sắp xếp

  try {
    // const _page =  req.query._page || 1
    // const _limit = req.query._limit || 10
    // const _sort = req.query._sort || "createdAt"
    // const _order =req.query._order || 'asc'

    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc"
    } = req.query

    // order with string, number, datetime
    // -> customer order function 

    const options = {
      page: _page,
      limit: _limit,
      // sort by createdAt/price/rate...
      [_sort]: _order === "desc" ? -1 : 1
    }
    // const data = await Product.find({})
    const data = await Product.paginate({}, options)
    console.log(data)
    if (!data.docs && data.docs.length === 0) {
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

    // Cập nhật danh mục mà liên quan đến sản phẩm vừa thêm.
    const updateCategories =  await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id
      }
    })

    // Sau này: xử lý danh mục mặc định cho sản phẩm khi admin không nhập danh mục.

    if(!updateCategories) {
      return res.status(404).json({
        message: "Add Category for new product not successful",
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

    // Cập nhật danh mục mà liên quan đến sản phẩm vừa thêm.
    // _id không bao giờ thay đổi.
    const updateCategories =  await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id
      }
    })

    if(!updateCategories) {
      return res.status(404).json({
        message: "Add Category for new product not successful",
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
