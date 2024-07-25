import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../repositories";
import AppError from "../utils/errors/app-error";
import  jwt  from "jsonwebtoken";
import ServerConfig from "../config/server-config";
import { IUser } from "../models/user-model";
import mongoose from "mongoose";
const userRepository = new UserRepository();

async function createUser(data:IUser):Promise<Omit<IUser,'password'>>{
    try{
        const user = await userRepository.create(data)
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    } catch (error) {
        throw new AppError(
          "Something went wrong",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
}

async function findUser(email:string):Promise<IUser | null>{
    try{
        const query = {email:email}
        const user = await userRepository.getOne(query)
        return user;
    } catch (error) {
        throw new AppError(
          "Something went wrong",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
}

async function findUserById(id:mongoose.Types.ObjectId):Promise<IUser | null>{
    try{
        const user = await userRepository.getById(id)
        return user;
    } catch (error) {
        throw new AppError(
          "Something went wrong",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
}

const generateToken = (id:mongoose.Types.ObjectId) =>{
    return jwt.sign({id},ServerConfig.JWT_SECRET,{expiresIn:"1d"})
  }

export {
    createUser,
    findUser,
    generateToken,
    findUserById
}