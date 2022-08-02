import { Router } from "express";

import { sendUserInformation } from "../controllers/userController.js";
import verifyToken from "../infra/validators/verifyToken.js";
import userInformation from "../infra/middlewares/userInformation.js";

const userRouter = Router();

userRouter.get("/users/me", verifyToken, userInformation, sendUserInformation);

export default userRouter;
