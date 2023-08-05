import User from "../models/User";
import { signInValidator, signUpValidator } from "../validations/users";
import bcrypt from "bcrypt";
// Các thư viện hỗ trợ mã hoá: bcrypt, bcryptjs, md5...
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_CODE } = process.env;

export const signUp = async (req, res) => {
  try {
    // Bước 1: valid dữ liệu người dùng
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Bước 2: Kiểm tra xem email này đã đăng ký hay chưa?

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
      });
      // Cách 2: Sử dụng throw new Error:
      // throw 404
      // throw new Error("Email này đã được đăng ký, bạn có muốn đăng nhập không?")
    }

    // Bước 3: Mã hoá password.
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Bước 4: Tạo và lưu account vào database.
    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    // Bước 5: Trả ra thông báo cho client
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng ký tài khoản thành công!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signInValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Bạn chưa đăng ký email này!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng!",
      });
    }

    // Tạo JWT:

    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });

    // Return result:
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập tài khoản thành công!",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
