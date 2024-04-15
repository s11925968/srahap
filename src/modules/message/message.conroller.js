import MessageModel from "../../../DB/model/message.model.js";
import userModel from "../../../DB/model/user.model.js";

export const getMessages=async(req,res)=>{

  const messageList=await MessageModel.find({receiverId:req.user.id})
  return res.json({messages:"success",messageList});
}
export const sendMessage=async(req,res)=>{
  const {receiverId} = req.params;

  const {message}=req.body;

  const user=await userModel.findById(receiverId);

  if(!user){
    return res.status(404).json({message:"user not found"});
  
  }
  const createMessage=await MessageModel.create({content:message,receiverId});

  return res.status(201).json({message:"success",createMessage});


}