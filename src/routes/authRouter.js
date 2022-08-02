import { Router } from "express";

import { signup, signin } from "../controllers/authController.js";
import signupValidator from "../infra/validators/signupValidator.js";
import signinValidator from "../infra/validators/signinValidator.js";
import signupUser from "../infra/middlewares/signupUser.js";
import loginUser from "../infra/middlewares/loginUser.js";

const authRouter = Router();

authRouter.post("/signup", signupValidator, signupUser, signup);
authRouter.post("/signin", signinValidator, loginUser, signin);

export default authRouter;
