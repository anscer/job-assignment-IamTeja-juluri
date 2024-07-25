import { Request, Response } from "express";
import { UserService } from "../services";
import AppError from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

async function register(req: Request, res: Response): Promise<Response> {
  try {
    const newUser = await UserService.createUser(req.body);
    const token = UserService.generateToken(newUser._id as mongoose.Types.ObjectId);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
      sameSite: "none",
      secure: true,
    });

    SuccessResponse.data = newUser == null ? {} : newUser;
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

async function login(req: Request, res: Response): Promise<Response> {
  try {
    const user = await UserService.findUser(req.body.email);

    if (!user) {
      throw new AppError(
        "User not found please sign up",
        StatusCodes.BAD_REQUEST
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    const token = UserService.generateToken(user._id as mongoose.Types.ObjectId);

    if (isPasswordCorrect) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
        sameSite: "none",
        secure: true,
      });
    }

    if (user && isPasswordCorrect) {
      SuccessResponse.data = `User ${user.name} has logged in successfully `;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    }

    return res.status(StatusCodes.BAD_REQUEST).json("Invalid Credentials");
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

export { register, login };
