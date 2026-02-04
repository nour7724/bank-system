import express from "express";
import { concDB } from "./database/connection.js";
import userController from "./modules/User/user.controller.js";
import transactionController from "./modules/Transaction/transaction.controller.js";

export const bootstrap = async () => {
  const app = express();
  
  await concDB();
  
  app.use(express.json());
  
  app.use("/api/auth", userController);
  app.use("/api/account", transactionController);
  
  app.use((err, req, res, next) => {
    res.json({
      success: false,
      message: err.message,
    });
  });
  
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};