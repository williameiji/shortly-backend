import { Router } from "express";

import { signup } from "../controllers/authController.js";
import signupValidator from "../infra/validators/signupValidator.js";
import signupUser from "../infra/middlewares/signupUser.js";

const authRouter = Router();

authRouter.post("/signup", signupValidator, signupUser, signup);

export default authRouter;
