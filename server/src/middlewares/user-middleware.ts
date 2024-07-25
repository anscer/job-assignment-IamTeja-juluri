import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services";

async function validateLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while logging in";
    ErrorResponse.error =
      "Please provide email in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while logging in";
    ErrorResponse.error =
      "Please provide password in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next()
}

async function validateRegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while logging in";
    ErrorResponse.error =
      "Please provide email in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while logging in";
    ErrorResponse.error =
      "Please provide password in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating a new user ";
    ErrorResponse.error =
      "Please provide name in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  const user = await UserService.findUser(req.body.email);
  if (user != null) {
    ErrorResponse.error = "User is already registered with this email";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

export { validateLoginRequest, validateRegisterUser };
