import { User } from "../../database/models/User.js";
import { Transaction } from "../../database/models/Transaction.js";

const deposit = async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  user.balance += amount;
  await user.save();

  const transaction = await Transaction.create({
    userId,
    type: "deposit",
    amount,
    balanceAfter: user.balance,
  });

  res.json({
    success: true,
    message: "Deposit successful",
    balance: user.balance,
    transaction: {
      _id: transaction._id,
      type: transaction.type,
      amount: transaction.amount,
      balanceAfter: transaction.balanceAfter,
    },
  });
};

const withdraw = async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  if (user.balance < amount) {
    return res.json({
      success: false,
      message: `not enough balance. Current balance: ${user.balance}`,
    });
  }

  user.balance -= amount;
  await user.save();

  const transaction = await Transaction.create({
    userId,
    type: "withdraw",
    amount,
    balanceAfter: user.balance,
  });

  res.json({
    success: true,
    message: "Withdrawal successful",
    balance: user.balance,
    transaction: {
      _id: transaction._id,
      type: transaction.type,
      amount: transaction.amount,
      balanceAfter: transaction.balanceAfter,
    },
  });
};

const getBalance = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  res.json({
    success: true,
    balance: user.balance,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const getTransactions = async (req, res) => {
  const { userId } = req.params;

  const transactions = await Transaction.find({ userId }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    transactions,
  });
};

export { deposit, withdraw, getBalance, getTransactions };
