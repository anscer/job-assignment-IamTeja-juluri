import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common";
import { Request, Response, NextFunction } from "express";

function validateCreateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = "Please provide name in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.description) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = "Please provide description in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.status) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = "Please provide status in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.params.key) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = "Please provide the url in the correct form";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}


function validateDeleteRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.params.id) {
      ErrorResponse.message = "Something went wrong";
      ErrorResponse.error = "Please provide the url in the correct form";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
  }

export { validateCreateRequest, validateUpdateRequest, validateDeleteRequest };
