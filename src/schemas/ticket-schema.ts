import Joi from "joi";

const ticketSchema = Joi.object({
  ticketTypeId: Joi.number().integer().required(),
});

export default ticketSchema;
