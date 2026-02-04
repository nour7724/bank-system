import { User } from "../../database/models/User.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ success: false, message: "Email already exists" });
  }
  
  const user = await User.create({ name, email, password, balance: 0 });
  
  res.json({
    success: true,
    message: "User signed up successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "Wrong email or password" });
  }
  
  if (user.password !== password) {
    return res.json({ success: false, message: "Wrong email or password" });
  }
  
  res.json({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
  });
};

export { signup, login };