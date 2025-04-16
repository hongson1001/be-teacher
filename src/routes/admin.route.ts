import { Router } from "express";
import { AdminController } from "../controller/adminController";

const router = Router();
const adminController = new AdminController();

router.post("/create", adminController.createAdmin.bind(adminController));
router.post("/login", adminController.login.bind(adminController));

export default router;