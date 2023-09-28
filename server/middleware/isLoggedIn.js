import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
  // Get token from header 
  const token = getTokenFromHeader(req);

  // Verfiy the token 
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    throw new Error("Invalid/Expire token, Please Login Again");
  } else {
    // Save the user into req object 
    req.userAuthId = decodedUser?.id;
    next();
  }
}