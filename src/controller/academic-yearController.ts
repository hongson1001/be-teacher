import { Request, Response } from "express";
import { AcademicYearService } from "../service/academic-yearService";

export class AcademicYearController {
    private readonly academicService = new AcademicYearService();

    async create(req: Request, res: Response) {
        try {
            const academic = await this.academicService.create(req.body);

            return res.status(201).send({
                status: 201,
                message: "Tạo năm học thành công",
                data: academic,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    async modify(req: Request, res: Response) {
        try {
            const academicYearId = parseInt(req.params.academicYearId);

            const academic = await this.academicService.modify(academicYearId, req.body);

            return res.status(200).send({
                status: 200,
                message: "Sửa năm học thành công",
                data: academic,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const academicYearId = parseInt(req.params.academicYearId);

            const academic = await this.academicService.remove(academicYearId);

            return res.status(200).send({
                status: 200,
                message: "Xóa năm học thành công",
                data: academic,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || "";

            const academic = await this.academicService.list(page, limit, search);

            return res.status(200).send({
                status: 200,
                message: "Lấy danh sách năm học thành công",
                data: academic,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const academicYearId = parseInt(req.params.academicYearId);

            const academic = await this.academicService.detail(academicYearId);

            return res.status(200).send({
                status: 200,
                message: "Lấy chi tiết năm học thành công",
                data: academic,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }
}