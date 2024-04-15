import userModel from "../../../DB/model/user.model.js";

export const profile=async(req,res)=>{

  const user=await userModel.findById(req.user.id);
  return res.json({message:'success',user})
}