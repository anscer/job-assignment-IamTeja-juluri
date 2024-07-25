import { StatusCodes } from "http-status-codes";
import { StateRepository } from "../repositories";
import AppError from "../utils/errors/app-error";
import { IState } from "../models/states-model";
import { IUser } from "../models/user-model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const stateRepository = new StateRepository();


async function createState(user:IUser, data:Partial<IState> &{name:string,description:string,status:string}):Promise<IState> {
  try {
    const newData   = {
      userId: user._id as mongoose.Types.ObjectId,
      createdBy: user.name,
      ...data
    } as IState;
    const response = await stateRepository.create(newData);
    return response;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getState(user:IUser):Promise<IState[]> {
  try {
    const query = { userId: user._id };
    const response = await stateRepository.get(query);
    return response;
  } catch (error) {
    console.log("error=",error)
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function updateState(id:string, user:IUser, data:Partial<IState>) {
  try {
    const query = { userId: user._id, _id: new ObjectId(id) };
    const response = await stateRepository.updateOne(query, data);
    return response;
  } catch (error) {
    throw new AppError(
      "Something went wrong or you might be not authorised to perform this action",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteState(id:string,user:IUser) {
  try {
    const query = {_id : new ObjectId(id),userId : user._id}
    const response = await stateRepository.deleteOne(query);
    return response;
  } catch (error) {
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}



export { createState, getState, updateState, deleteState };
