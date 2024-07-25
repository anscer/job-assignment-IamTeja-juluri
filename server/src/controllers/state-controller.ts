import { StatusCodes } from "http-status-codes";
import { StateService } from "../services";
import { SuccessResponse, ErrorResponse } from "../utils/common";
import {  Response } from "express";
import AppError from "../utils/errors/app-error";
import { AuthenticatedRequest } from "../middlewares/auth-middleware";

async function createState(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", StatusCodes.UNAUTHORIZED);
    }
    const response = await StateService.createState(req.user,req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error =
      error instanceof AppError ? error.message : "Internal Server Error";
    return res
      .status(
        error instanceof AppError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}

async function fetchState(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", StatusCodes.UNAUTHORIZED);
    }
    const response = await StateService.getState(req.user);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error =
      error instanceof AppError ? error.message : "Internal Server Error";
    return res
      .status(
        error instanceof AppError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}

async function updateState(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", StatusCodes.UNAUTHORIZED);
    }
    const response = await StateService.updateState(req.params.key,req.user,req.body);
    SuccessResponse.data = response == null ? {} : response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error =
      error instanceof AppError ? error.message : "Internal Server Error";
    return res
      .status(
        error instanceof AppError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}

async function deleteState(req: AuthenticatedRequest, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", StatusCodes.UNAUTHORIZED);
    }
    const response = await StateService.deleteState(req.params.id,req.user);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error =
      error instanceof AppError ? error.message : "Internal Server Error";
    return res
      .status(
        error instanceof AppError
          ? error.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}

export { createState, fetchState, updateState, deleteState };
