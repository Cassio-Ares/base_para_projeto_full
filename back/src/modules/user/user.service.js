import jwt from "jsonwebtoken";

export const getMe = async (token) => {
  try {
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);
    return dataToken;
  } catch (error) {
    return {
      error: "Token inválido",
    };
  }
};
