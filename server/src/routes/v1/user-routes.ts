import { Router } from "express";
import { UserController } from "../../controllers";
import { UserMiddleware } from "../../middlewares";
const router = Router();
router.post(
  "/login",
  UserMiddleware.validateLoginRequest,
  UserController.login
);
router.post(
  "/register",
  UserMiddleware.validateRegisterUser,
  UserController.register
);

export default router;
