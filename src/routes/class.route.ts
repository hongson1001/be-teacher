import { Router } from "express";
import { ClassController } from "../controller/classController";

const router = Router();
const classController = new ClassController();

router.post("/", classController.create.bind(classController));
router.put("/:classId", classController.modify.bind(classController));
router.delete("/:classId", classController.remove.bind(classController));
router.get("/:classId", classController.detail.bind(classController));
router.get("/", classController.list.bind(classController));

export default router;