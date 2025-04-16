import { Router } from "express";
import { AssignmentController } from "../controller/assignmentController";

const router = Router();
const assignmentsController = new AssignmentController();

router.post("/create", assignmentsController.create.bind(assignmentsController));
router.put("/modify/:assignmentId", assignmentsController.modify.bind(assignmentsController));
router.delete("/delete/:assignmentId", assignmentsController.remove.bind(assignmentsController));
router.get("/list", assignmentsController.list.bind(assignmentsController));
router.get("/teacher", assignmentsController.listByTeacher.bind(assignmentsController));
router.get("/detail/:assignmentId", assignmentsController.detail.bind(assignmentsController));

export default router;