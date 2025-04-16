import { Request, Response } from "express";
import { CreateChangeRequestDto, UpdateChangeRequestDto } from "../model/dto/change-request.dt";
import { ChangeRequestService } from "../service/change-requestService";

export class ChangeRequestController {
    private changeRequestService: ChangeRequestService;

    constructor() {
        this.changeRequestService = new ChangeRequestService();
    }

    // Tạo yêu cầu thay đổi lớp học/lịch học
    async create(req: Request, res: Response) {
        try {
            const data: CreateChangeRequestDto = req.body;
            const newRequest = await this.changeRequestService.create(data);

            return res.status(201).send({
                status: 201,
                message: "Yêu cầu thay đổi được tạo thành công",
                data: newRequest,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi xảy ra",
                error: error.message,
            });
        }
    }

    // Lấy danh sách yêu cầu của giáo viên
    async listByTeacher(req: Request, res: Response) {
        try {
            const customerId = parseInt(req.params.customerId);
            const { page, limit } = req.query;

            const requests = await this.changeRequestService.listByTeacher(customerId, parseInt(page as string), parseInt(limit as string));

            return res.status(200).send({
                status: 200,
                message: "Danh sách yêu cầu",
                data: requests,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi xảy ra",
                error: error.message,
            });
        }
    }

    // Lấy danh sách tất cả yêu cầu của admin
    async listAll(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;

            const requests = await this.changeRequestService.listAll(parseInt(page as string), parseInt(limit as string));

            return res.status(200).send({
                status: 200,
                message: "Danh sách yêu cầu của admin",
                data: requests,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi xảy ra",
                error: error.message,
            });
        }
    }

    // Cập nhật yêu cầu (phê duyệt hoặc từ chối)
    async update(req: Request, res: Response) {
        try {
            const requestId = parseInt(req.params.id);
            const data: UpdateChangeRequestDto = req.body;

            const updatedRequest = await this.changeRequestService.update(requestId, data);

            return res.status(200).send({
                status: 200,
                message: "Cập nhật yêu cầu thành công",
                data: updatedRequest,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Có lỗi xảy ra",
                error: error.message,
            });
        }
    }
}