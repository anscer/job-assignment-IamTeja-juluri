import AppError from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import mongoose, { Model,Document,FilterQuery,UpdateQuery,UpdateWriteOpResult,Types,QueryOptions} from "mongoose";

class CrudRepository <T extends Document>{

  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    const response = await this.model.create(data);
    return response;
  }


  async deleteOne(query: FilterQuery<T>) : Promise<number>  {
    const response  = await this.model.deleteOne(query);
    if (response.deletedCount != 1)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response.deletedCount;
  }

  async deleteMany(query: FilterQuery<T>): Promise<number> {
    const response = await this.model.deleteMany(query);
    if (response.deletedCount < 1)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response.deletedCount;
  }

  async get(query: FilterQuery<T>): Promise<T[]> {
    const response: T[] = await this.model
      .find(query)
      .sort({ createdAt: -1 })
      .lean();
    return response;
  }

  async getOne(query: FilterQuery<T>): Promise<T | null> {
    const response= await this.model.findOne(query);
    return response;
  }

  async getById(id:mongoose.Types.ObjectId): Promise<T | null> {
    const response = await this.model.findById(id).select("-password");
    if (!response)
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    return response;
  }

  async getByIdAndUpdate(id:Types.ObjectId, data: Partial<T>): Promise <T | null> {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    } as QueryOptions<T>);
    if (!response)
      throw new AppError(
        "Not able to find and update resource",
        StatusCodes.NOT_FOUND
      );
    return response;
  }

  async getAndDelete(query : FilterQuery<T> ): Promise<T | null> {
    const response = await this.model.findOneAndDelete(query);
    if (!response)
      throw new AppError(
        "Not able to find or update resource",
        StatusCodes.NOT_FOUND
      );
    return response;
  }

  async updateOne(query: FilterQuery<T>, data:Partial<T>): Promise<T | null> {
    const response = await this.model
      .findOneAndUpdate(query, { $set: data } as UpdateQuery<T> , { new: true })
      .exec();
    if (!response)
      throw new AppError("Source not found or you are not the author",StatusCodes.INTERNAL_SERVER_ERROR);
    return response;
  }

  async updateMany(query: FilterQuery<T> , data: Partial<T>): Promise<number>  {
    const response : UpdateWriteOpResult = await this.model
      .updateMany(query, { $set: data } as UpdateQuery<T>, { new: true })
      .exec();
    if (response.modifiedCount === 0)
      throw new AppError("Source not found or you are not the author",StatusCodes.INTERNAL_SERVER_ERROR);
    return response.modifiedCount;
  }
}

export default CrudRepository;

