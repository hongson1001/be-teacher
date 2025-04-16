import { Request, Response } from "express";
import { CourseService } from "../service/courseService";

export class CourseController {
    private courseService = new CourseService();

    async create(req: Request, res: Response) {
        try {
            const result = await this.courseService.create(req.body);
            return res.status(201).send({ status: 201, message: "Tạo môn học thành công", data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, message: "Lỗi tạo môn học", error: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const result = await this.courseService.modify(courseId, req.body);
            return res.status(200).send({ status: 200, message: "Sửa môn học thành công", data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, message: "Lỗi sửa môn học", error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const result = await this.courseService.remove(courseId);
            return res.status(200).send({ status: 200, message: result });
        } catch (error) {
            return res.status(500).send({ status: 500, message: "Lỗi xóa môn học", error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const result = await this.courseService.detail(courseId);
            return res.status(200).send({ status: 200, data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, message: "Lỗi lấy chi tiết môn học", error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";

            const result = await this.courseService.list(page, limit, search);
            return res.status(200).send({ status: 200, message: "Lấy danh sách môn học thành công", data: result });
        } catch (error) {
            return res.status(500).send({ status: 500, message: "Lỗi danh sách môn học", error: error.message });
        }
    }
}