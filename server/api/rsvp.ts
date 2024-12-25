import { defineEventHandler, getQuery } from "h3";
import jwt from "jsonwebtoken";

const config = useRuntimeConfig();
const secretKey = config.jwtSecretKey;

export default defineEventHandler(async (event) => {
  const { p } = getQuery(event);

  if (!p) {
    return { statusCode: 400, message: "No token provided" };
  }
  try {
    const tokenData = jwt.verify(p, secretKey);
    return { statusCode: 200, data: tokenData };
  } catch (err) {
    // console.error(err.message, "error verifying token");
    return { statusCode: 401, message: "Invalid token" };
  }
});
