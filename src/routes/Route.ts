import { Router } from "express";
import academicYearRoute from "./academic-years.route";
import assignmentsRoute from "./assignments.route";
import attendanceRoute from "./attemdace.route";
import changeRequestRoute from "./change-request.route";
import classRoute from "./class.route";
import courseRoute from "./courses.route";
import customerRoute from "./customer.route";
import roomRoute from "./rooms.route";
import semesterRoute from "./semesters.route";
import adminRoute from "./admin.route";

const router = Router();

router.use("/admin", adminRoute);
router.use("/academic-year", academicYearRoute);
router.use("/assignments", assignmentsRoute);
router.use("/attendance", attendanceRoute);
router.use("/change-request", changeRequestRoute);
router.use("/class", classRoute);
router.use("/course", courseRoute);
router.use("/customer", customerRoute);
router.use("/room", roomRoute);
router.use("/semester", semesterRoute);

export default router;