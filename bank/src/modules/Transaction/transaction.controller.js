import express from "express";
import {
  deposit,
  withdraw,
  getBalance,
  getTransactions,
} from "./transaction.service.js";

const router = express.Router();

router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.get("/balance/:userId", getBalance);
router.get("/transactions/:userId", getTransactions);

export default router;
