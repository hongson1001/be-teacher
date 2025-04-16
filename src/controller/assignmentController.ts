import { Request, Response } from "express";
import { AssignmentService } from "../service/assignmentService";

export class AssignmentController {
    private readonly assignmentService = new AssignmentService();

    async create(req: Request, res: Response) {
        try {
            const assignment = await this.assignmentService.create(req.body);
            res.status(201).send({ status: 201, message: "Tạo phân công thành công", data: assignment });
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const assignmentId = parseInt(req.params.assignmentId);
            const assignment = await this.assignmentService.modify(assignmentId, req.body);
            res.status(200).send({ status: 200, message: "Cập nhật phân công thành công", data: assignment });
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const assignmentId = parseInt(req.params.assignmentId);
            const msg = await this.assignmentService.remove(assignmentId);
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

            const result = await this.assignmentService.list(page, limit, search);
            res.status(200).send({ status: 200, message: "Lấy danh sách phân công thành công", data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async listByTeacher(req: Request, res: Response) {
        try {
            const customerId = parseInt(req.query.customerId as string);
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            if (isNaN(customerId)) {
                return res.status(400).send({
                    status: 400,
                    message: "Thiếu hoặc sai customerId",
                });
            }
    
            const result = await this.assignmentService.listByTeacher(customerId, page, limit);
            return res.status(200).send({
                status: 200,
                message: "Lấy lịch phân công của giáo viên thành công",
                data: result,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi xảy ra",
                error: error.message,
            });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const assignmentId = parseInt(req.params.assignmentId);
            const assignment = await this.assignmentService.detail(assignmentId);
            res.status(200).send({ status: 200, message: "Lấy thông tin phân công thành công", data: assignment });
        } catch (error) {
            res.status(404).send({ status: 404, message: error.message });
        }
    }
}