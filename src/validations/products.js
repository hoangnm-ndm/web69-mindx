import Joi from "joi";

const productValidator = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  price: Joi.number().required(),
  desc: Joi.string(),
  categoryId: Joi.string().required(),
});

export default productValidator;
