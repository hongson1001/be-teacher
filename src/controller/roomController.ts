import { Request, Response } from "express";
import { RoomService } from "../service/roomService";

export class RoomController {
    private readonly roomService = new RoomService();

    async create(req: Request, res: Response) {
        try {
            const room = await this.roomService.create(req.body);
            res.status(201).send({ status: 201, message: "Tạo phòng thành công", data: room });
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.roomId);
            const room = await this.roomService.modify(roomId, req.body);
            res.status(200).send({ status: 200, message: "Cập nhật phòng thành công", data: room });
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.roomId);
            const msg = await this.roomService.remove(roomId);
            res.status(200).send({ status: 200, message: msg });
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string;

            const result = await this.roomService.list(page, limit, search);
            res.status(200).send({ status: 200, message: "Lấy danh sách phòng thành công", data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.roomId);
            const room = await this.roomService.detail(roomId);
            res.status(200).send({ status: 200, message: "Lấy thông tin phòng thành công", data: room });
        } catch (error) {
            res.status(404).send({ status: 404, message: error.message });
        }
    }
}