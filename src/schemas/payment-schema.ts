import { PaymentData } from "@/protocols";
import Joi from "joi";

const paymentSchema = Joi.object<PaymentData>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(),
});

export default paymentSchema;
