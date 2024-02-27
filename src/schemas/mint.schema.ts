import Joi from "joi";

export const mint = Joi.object()
  .keys({
    txHash: Joi.string().required(),
  })
  .required();

export const get = Joi.object()
  .keys({
    txHash: Joi.string().required(),
  })
  .required();
