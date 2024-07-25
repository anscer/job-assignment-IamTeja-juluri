import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common";
import { ServerConfig } from "../config";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user-model";
import { UserService } from "../services";
import mongoose from "mongoose";


interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      ErrorResponse.error = "You are not authorized yet, please login";
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    const decoded = jwt.verify(token, ServerConfig.JWT_SECRET) as JwtPayload & {
      id: mongoose.Types.ObjectId;
    };
    const user = await UserService.findUserById(decoded.id);
    if (!user) {
      ErrorResponse.error = "User not found";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      ErrorResponse.error = "Invalid token, please login again";
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    ErrorResponse.error = "Internal Server Error";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};

export default protect
export type {AuthenticatedRequest}