import { Router } from "express";
import { AttendanceController } from "../controller/attemdaceController";

const router = Router();
const attendanceController = new AttendanceController();

router.post("/attendances/create", attendanceController.create.bind(attendanceController));
router.put("/attendances/:id", attendanceController.modify.bind(attendanceController));
router.get("/attendances", attendanceController.list.bind(attendanceController));
router.get("/attendances/:id", attendanceController.detail.bind(attendanceController));

export default router;