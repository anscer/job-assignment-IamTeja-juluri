import mongoose, { Document, Model, Schema, SchemaDefinition } from "mongoose";

interface IToken extends Document {
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

const tokenSchemaDefinition: SchemaDefinition = {
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  expiresAt: {
    type: Date,
    required: true,
  },
};

const tokenSchema: Schema<IToken> = new mongoose.Schema(tokenSchemaDefinition, {
  timestamps: true,
});

const Token: Model<IToken> = mongoose.model<IToken>("Token", tokenSchema);
export default Token;
export type { IToken };
