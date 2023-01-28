import { prisma } from "@/config";

type PaymentDataToInsert = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

async function findPayment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
async function createPayment(data: PaymentDataToInsert) {
  return await prisma.payment.create({
    data,
  });
}

const paymentsRepository = {
  findPayment,
  createPayment,
};

export default paymentsRepository;
