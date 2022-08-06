import { Router } from "express";

import { sendUserInformation } from "../controllers/userController.js";
import verifyToken from "../infra/validators/verifyToken.js";

const userRouter = Router();

userRouter.get("/users/me", verifyToken, sendUserInformation);

export default userRouter;
