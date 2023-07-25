import Joi from "joi";

const categoryValidator = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  slug: Joi.string().min(3).max(255).required(),
  products: Joi.array()
});

export default categoryValidator;
