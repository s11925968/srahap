import mongoose, { model } from 'mongoose';
import { Schema } from "mongoose";

  const UserSchema = new Schema({
  userName:{
    type:String,
    required:true,
  }, // String is shorthand for {type: String}
  email:{
    type:String,
    required:true,
    unique:true,
  } ,
  password:{
    type:String,
    required:true,
  },
  age:Number,
  gender:{
    type:String,
    enum:['Male','Female'],
  },
  confirmEmail:{
    type:Boolean,
    default:false,
  }
},{
  timestamps:true,
});
const userModel=model('User',UserSchema)
export default userModel;