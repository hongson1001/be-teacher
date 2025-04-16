import { Router } from "express";
import { SemesterController } from "../controller/semesterController";

const router = Router();
const semesterController = new SemesterController();

router.post("/", semesterController.create.bind(semesterController));
router.put("/:semesterId", semesterController.modify.bind(semesterController));
router.delete("/:semesterId", semesterController.remove.bind(semesterController));
router.get("/", semesterController.list.bind(semesterController));
router.get("/:semesterId", semesterController.detail.bind(semesterController));

export default router;