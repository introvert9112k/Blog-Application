import Token from "../model/token.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

// This function validates whether the token exists in the database or not
const verifyRefreshToken = async (refreshToken) => {
  try {
    const doc = await Token.findOne({ token: refreshToken }).exec();

    if (!doc) {
      throw { error: true, message: "Invalid Refresh Token" };
    }

    const tokenDetails = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    );

    return {
      tokenDetails,
      error: false,
      message: "Valid Refresh Token",
    };
  } catch (error) {
    throw error;
  }
};

export default verifyRefreshToken;
