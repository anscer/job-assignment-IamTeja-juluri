import mongoose, { Document, Model, Schema ,SchemaDefinition} from "mongoose";
import bcrypt from "bcryptjs"


interface IUser extends Document{
    name : string,
    email : string,
    password : string
}

const userSchemaDefinition : SchemaDefinition = {
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : [true,"Please provide the password"],
        minLength : [6,"Password must be atleast 8 characters"],
    }     
}

const userSchema : Schema = new mongoose.Schema(userSchemaDefinition,{
    timestamps:true
})


//hash password before saving to database
userSchema.pre<IUser>('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
})


const User : Model<IUser> = mongoose.model<IUser>('User',userSchema)
export default User
export type {IUser}