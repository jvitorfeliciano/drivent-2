import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/");

export { paymentsRouter };
