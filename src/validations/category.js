import Joi from "joi";

const categoryValidator = Joi.object({
  name: Joi.string().required().min(3).max(255),
  slug: Joi.string().required().min(3).max(255)
});

export default categoryValidator;
