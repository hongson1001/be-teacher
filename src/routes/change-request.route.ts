import { Router } from "express";
import { ChangeRequestController } from "../controller/change-requestController";

const router = Router();
const changeRequestController = new ChangeRequestController();

// Tạo yêu cầu thay đổi
router.post("/create", changeRequestController.create.bind(changeRequestController));

// Lấy danh sách yêu cầu của giáo viên
router.get("/teacher/:customerId", changeRequestController.listByTeacher.bind(changeRequestController));

// Lấy danh sách tất cả yêu cầu (admin)
router.get("/admin", changeRequestController.listAll.bind(changeRequestController));

// Cập nhật yêu cầu (admin phê duyệt hoặc từ chối)
router.put("/update/:id", changeRequestController.update.bind(changeRequestController));

export default router;