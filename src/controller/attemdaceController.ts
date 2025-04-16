import { Request, Response } from "express";
import { AttendanceService } from "../service/attemdaceService";
import { CreateAttendanceDto, UpdateAttendanceDto } from "../model/dto/attemdace.dto";

export class AttendanceController {
    private attendanceService = new AttendanceService();

    async create(req: Request, res: Response) {
        try {
            const createDto: CreateAttendanceDto = req.body;
            const attendance = await this.attendanceService.create(createDto);

            return res.status(200).json({
                status: 200,
                message: "Điểm danh thành công",
                data: attendance,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    // Cập nhật điểm danh
    async modify(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updateDto: UpdateAttendanceDto = req.body;
            const attendance = await this.attendanceService.modify(id, updateDto);

            return res.status(200).json({
                status: 200,
                message: "Cập nhật điểm danh thành công",
                data: attendance,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    // Lấy danh sách điểm danh
    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await this.attendanceService.list(page, limit);

            return res.status(200).json({
                status: 200,
                message: "Danh sách điểm danh",
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }

    // Lấy chi tiết điểm danh
    async detail(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const attendance = await this.attendanceService.detail(id);

            return res.status(200).json({
                status: 200,
                message: "Chi tiết điểm danh",
                data: attendance,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Có lỗi trong quá trình xử lý",
                error: error.message,
            });
        }
    }
}