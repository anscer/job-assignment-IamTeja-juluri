import {Router} from "express";
import userRoutes from "./user-routes"
import stateRoutes from "./states-routes"
const router = Router()
router.use("/user",userRoutes)
router.use("/states",stateRoutes)
export default router