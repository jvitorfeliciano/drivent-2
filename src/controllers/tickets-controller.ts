import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsType(req: Request, res: Response) {
  try {
    const ticketsType = await ticketsService.getTicketsType();

    res.send(ticketsType);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getTicketsAndTicketType(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const tickets = await ticketsService.getTicketsAndTicketsType(userId);

    res.send(tickets);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketTypeId } = req.body;
  
  try {
    const ticket = await ticketsService.postTicket(userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
