import { Router } from "express";
import { RoomController } from "../controller/roomController";

const router = Router();
const roomController = new RoomController();

router.post("/create", roomController.create.bind(roomController));
router.put("/modify/:roomId", roomController.modify.bind(roomController));
router.delete("/delete/:roomId", roomController.remove.bind(roomController));
router.get("/list", roomController.list.bind(roomController));
router.get("/detail/:roomId", roomController.detail.bind(roomController));

export default router;