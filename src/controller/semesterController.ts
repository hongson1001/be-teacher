import { Request, Response } from "express";
import { SemesterService } from "../service/semestersService";

export class SemesterController {
    private semesterService = new SemesterService();

    async create(req: Request, res: Response) {
        try {
            const semester = await this.semesterService.create(req.body);
            res.status(201).send({ status: 201, message: "Tạo học kỳ thành công", data: semester });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const semesterId = parseInt(req.params.semesterId);
            const semester = await this.semesterService.modify(semesterId, req.body);
            res.status(200).send({ status: 200, message: "Sửa học kỳ thành công", data: semester });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const semesterId = parseInt(req.params.semesterId);
            const result = await this.semesterService.remove(semesterId);
            res.status(200).send({ status: 200, message: result });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const data = await this.semesterService.list(page, limit);
            res.status(200).send({ status: 200, message: "Lấy danh sách học kỳ thành công", data });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const semesterId = parseInt(req.params.semesterId);
            const semester = await this.semesterService.detail(semesterId);
            res.status(200).send({ status: 200, message: "Lấy thông tin học kỳ thành công", data: semester });
        } catch (error) {
            res.status(500).send({ status: 500, message: "Có lỗi trong quá trình xử lý", error: error.message });
        }
    }
}