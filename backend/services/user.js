const User = require("../models/user");
const { sendOtp } = require("./email");
const jwt = require("jsonwebtoken");

async function login(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await sendOtp(email, otp);

  // Check if user exist
  let user = await User.findOne({ where: { email } });

  if (user) {
    user.otp = otp;
    await user.save();
  } else {
    user = await User.create({ email, otp });
  }
}

async function verifyOtp(data) {
  const email = data.email;
  const otp = data.otp;
  const user = await User.findOne({ where: { email, otp } });
  if (!user) return false;
  else {
    const token = jwt.sign(
      { userId: user.dataValues.id },
      process.env.JWT_SECRET
    );
    return token;
  }
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }
}

module.exports = {
  login,
  verifyOtp,
  verifyToken,
};
