import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsType() {
  const ticketsType = await ticketsRepository.findMany();

  return ticketsType;
}

async function getTicketsAndTicketsType(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  const tickets = await ticketsRepository.findTicketandTicketType(userId);

  if (!tickets) {
    throw notFoundError();
  }

  return tickets;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const enrollmentId = enrollment.id;

  const response = await ticketsRepository.createTicket(ticketTypeId, enrollmentId);

  return response;
}

const ticketsService = {
  getTicketsType,
  getTicketsAndTicketsType,
  postTicket,
};

export default ticketsService;
