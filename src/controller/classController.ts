import { Request, Response } from "express";
import { ClassService } from "../service/classService";

export class ClassController {
    private classService = new ClassService();

    async create(req: Request, res: Response) {
        try {
            const result = await this.classService.create(req.body);
            res.status(201).send({ status: 201, message: "Tạo lớp học thành công", data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Lỗi tạo lớp học", error: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const classId = parseInt(req.params.classId);
            const result = await this.classService.modify(classId, req.body);
            res.status(200).send({ status: 200, message: "Cập nhật lớp học thành công", data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Lỗi cập nhật lớp học", error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const classId = parseInt(req.params.classId);
            const result = await this.classService.remove(classId);
            res.status(200).send({ status: 200, message: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Lỗi xóa lớp học", error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const classId = parseInt(req.params.classId);
            const result = await this.classService.detail(classId);
            res.status(200).send({ status: 200, message: "Chi tiết lớp học", data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Lỗi lấy chi tiết lớp học", error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";

            const result = await this.classService.list(page, limit, search);
            res.status(200).send({ status: 200, message: "Danh sách lớp học", data: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Lỗi lấy danh sách lớp học", error: error.message });
        }
    }
}