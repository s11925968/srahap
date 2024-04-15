import mongoose, { Types, model } from 'mongoose';
import { Schema } from "mongoose";

  const MessageSchema = new Schema({
    content:{
      type:String,
      required:true,
    },
    receiverId:{
      type:Types.ObjectId,
      required:true,
    }
},{
  timestamps:true,
});
const MessageModel=model('Message',MessageSchema)
export default MessageModel;