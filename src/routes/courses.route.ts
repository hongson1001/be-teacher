import { Router } from "express";
import { CourseController } from "../controller/courseController";

const router = Router();
const courseController = new CourseController();

router.post("/", courseController.create.bind(courseController));
router.put("/:courseId", courseController.modify.bind(courseController));
router.delete("/:courseId", courseController.remove.bind(courseController));
router.get("/:courseId", courseController.detail.bind(courseController));
router.get("/", courseController.list.bind(courseController));

export default router;