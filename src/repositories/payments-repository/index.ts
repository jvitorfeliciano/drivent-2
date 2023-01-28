import { prisma } from "@/config";

async function findPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentsRepository = {
  findPayment,
};

export default paymentsRepository;
