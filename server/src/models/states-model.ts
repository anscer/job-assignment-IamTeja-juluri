import mongoose, { Document, Model, Schema, SchemaDefinition } from "mongoose";

interface IState extends Document {
  userId:mongoose.Types.ObjectId,
  name: string;
  description: string;
  status: string;
  createdBy: string;
}

const stateSchemaDefinition: SchemaDefinition = {
  userId : {
    type: mongoose.Types.ObjectId,
    required: true,
    ref : "User"
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true,
  },
};

const stateSchema: Schema<IState> = new mongoose.Schema(stateSchemaDefinition, {
  timestamps: true,
});

const State: Model<IState> = mongoose.model<IState>("State", stateSchema);
export default State;
export type { IState };
