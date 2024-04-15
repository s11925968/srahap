import { Router } from "express";
import * as authController from './auth.contorller.js'
import { asyncHandler } from "../../middleware/errorHandling.js";
import validtion from "../../middleware/vlidation.js";
import { singinSchema, singupSchema } from "./auth.validation.js";

const router=Router();
router.post('/singup',validtion(singupSchema),asyncHandler(authController.Singup),authController.Singup);
router.post('/singin',validtion(singinSchema),asyncHandler(authController.Singin),authController.Singin);
router.get('/confirmEmail/:email',authController.confirmEmail);
export default router;