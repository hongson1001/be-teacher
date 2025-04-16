import { Router } from "express";
import { AcademicYearController } from "../controller/academic-yearController";

const router = Router();
const academicYearController = new AcademicYearController();

router.get("/", academicYearController.list.bind(academicYearController));
router.get("/:academicYearId", academicYearController.detail.bind(academicYearController));
router.post("/create", academicYearController.create.bind(academicYearController));
router.put("/modify/:academicYearId", academicYearController.modify.bind(academicYearController));
router.delete("/remove/:academicYearId", academicYearController.remove.bind(academicYearController));

export default router;