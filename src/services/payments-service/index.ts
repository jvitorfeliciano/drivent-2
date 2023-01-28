import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPayment(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const id = ticket.Enrollment.userId;

  if (id !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findPayment(ticketId);

  return payment;
}

const paymentsService = {
  getPayment,
};

export default paymentsService;
