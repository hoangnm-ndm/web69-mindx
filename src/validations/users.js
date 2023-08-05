import Joi from "joi";

export const signUpValidator = Joi.object({
  userName: Joi.string().required().messages({
    "string.empty": "userName không được để trống!",
    "any.required": 'Trường "userName" là bắt buộc!',
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống!",
    "any.required": 'Trường "email" là bắt buộc!',
    "string.email": "Email không đúng định dạng!",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống!",
    "any.required": 'Trường "password" là bắt buộc!',
    "string.min": "Password phải có ít nhất {#limit} ký tự!",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "confirmPassword không được để trống!",
    "any.required": 'Trường "confirmPassword" là bắt buộc!',
    "string.min": "confirmPassword phải có ít nhất {#limit} ký tự!",
    "any.only": "Mật khẩu nhập lại không khớp!",
  }),
});

export const signInValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống!",
    "any.required": 'Trường "email" là bắt buộc!',
    "string.email": "Email không đúng định dạng!",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password không được để trống!",
    "any.required": 'Trường "password" là bắt buộc!',
    "string.min": "Password phải có ít nhất {#limit} ký tự!",
  }),
});
