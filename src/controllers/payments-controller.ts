import { badRequestError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import { PaymentData } from "@/protocols";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string | undefined;
  const userId = req.userId;

  try {
    if (!ticketId) {
      throw badRequestError();
    }

    const payment = await paymentsService.getPayment(Number(ticketId), userId);
    res.status(200).send(payment);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (err.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const paymentData = req.body as PaymentData;
  const userId = req.userId;

  try {
    const payment = await paymentsService.postPayment(paymentData, userId);
    res.status(200).send(payment);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
