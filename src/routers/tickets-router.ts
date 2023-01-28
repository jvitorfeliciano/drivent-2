import { getTicketsAndTicketType, getTicketsType, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import ticketSchema from "@/schemas/ticket-schema";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsType)
  .get("/", getTicketsAndTicketType)
  .post("/", validateBody(ticketSchema), postTicket);
  
export { ticketsRouter };

