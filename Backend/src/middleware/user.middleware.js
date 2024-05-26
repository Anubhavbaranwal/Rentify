import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import jwt from "jsonwebtoken"
import { asynchandling } from "../Utils/Asynchndling.js";

export const VerifyJWT = asynchandling(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorize request");
    }
   
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken+"decodedToken2");
    const User1 = await User
      .findById(decodedToken._id)
      .select("-password -refreshtoken");

    if (!User1) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = User1;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});