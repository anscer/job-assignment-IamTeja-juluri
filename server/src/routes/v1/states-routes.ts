import { Router } from "express";
import { StateController } from "../../controllers";
import { AuthMiddleware, StateMiddlware } from "../../middlewares";
const router = Router();
router.post(
  "/add",
  AuthMiddleware,
  StateMiddlware.validateCreateRequest,
  StateController.createState
);
router.get("/read", AuthMiddleware, StateController.fetchState);
router.patch(
  "/modify/:key",
  AuthMiddleware,
  StateMiddlware.validateUpdateRequest,
  StateController.updateState
);
router.delete(
  "/remove/:id",
  AuthMiddleware,
  StateMiddlware.validateDeleteRequest,
  StateController.deleteState
);

export default router;
