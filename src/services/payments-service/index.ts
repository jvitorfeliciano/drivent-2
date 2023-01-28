import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentData } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPayment(ticketId: number, userId: number) {
  await validateTicket(ticketId, userId);

  const payment = await paymentsRepository.findPayment(ticketId);

  return payment;
}
async function validateTicket(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const id = ticket.Enrollment.userId;

  if (id !== userId) {
    throw unauthorizedError();
  }

  return ticket;
}

async function postPayment(paymentData: PaymentData, userId: number) {
  const ticket = await validateTicket(paymentData.ticketId, userId);

  const { price } = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId); // find the ticketype in order to get its price to associate with the data payment

  const body = {
    ticketId: paymentData.ticketId,
    value: price,
    cardIssuer: paymentData.cardData.issuer,
    cardLastDigits: paymentData.cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayment(body);

  await ticketsRepository.updateStatus(paymentData.ticketId);

  return payment;
}

const paymentsService = {
  getPayment,
  postPayment,
};

export default paymentsService;
