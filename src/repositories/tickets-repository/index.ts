import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findMany() {
  return await prisma.ticketType.findMany();
}

async function findTicketandTicketType(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      status: TicketStatus.RESERVED,
      enrollmentId,
    },

    include: {
      TicketType: true,
    },
  });
}

async function findById(id: number) {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findByTicketIdAndUserId(ticketId: number, userId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
      Enrollment: {
        userId,
      },
    },
  });
}

const ticketsRepository = {
  findMany,
  findTicketandTicketType,
  createTicket,
  findById,
  findByTicketIdAndUserId,
};

export default ticketsRepository;
