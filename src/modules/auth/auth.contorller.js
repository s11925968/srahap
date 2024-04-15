import userModel from "../../../DB/model/user.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { singinSchema, singupSchema } from "./auth.validation.js";
import sendEmail from "../utils/sendEmali.js";

export const Singup = async (req, res) => {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email is already in use" });
  } else {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALTROUND)
    );
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.json({ message: "error" });
    }
    const html=`
    <h1>confirm email</h1>
    <p>hello ${userName}</p>
    <a href="http://localhost:3000/auth/confirmEmail/${email}">confirm email</a>
    `
    await sendEmail(email,'welcome',html);
    return res.json({ message: "sucess", newUser });
  }
};
export const Singin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(409).json({ message: "email not exist" });
  }
  const match = await bcrypt.compare(password, user.password);
    if (!user.confirmEmail) {
      return res.status(403).json({ message: "plz confirm email" });
    }
    if (!match) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.LOGINSIG);
    return res.status(200).json({ message: "success", token });
  
};

export const confirmEmail= async (req,res)=>{

  const {email} = req.params;

  const user=await userModel.findOneAndUpdate({email: email},{confirmEmail: true});
  return res.json({ message: "success",user});

}