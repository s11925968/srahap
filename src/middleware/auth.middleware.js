import  jwt  from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";

const auth=async(req,res,next)=>{
  const {authorization} = req.headers;
  if(!authorization.startsWith(process.env.BEAREKEY)){
    return res.json({message:"invaild authorization"});
  }
  const token=authorization.split(process.env.BEAREKEY)[1];

  const decoded=await jwt.verify(token,process.env.LOGINSIG);

  const authUser=await userModel.findById(decoded.id).select('userName');
  req.user=authUser;

  next();
}

export default auth;