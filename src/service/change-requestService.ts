import { AppDataSource } from "../model/db";
import { CreateChangeRequestDto, UpdateChangeRequestDto } from "../model/dto/change-request.dt";
import { ChangeRequest } from "../model/entities/change-request";
import { Class } from "../model/entities/class";
import { Customer } from "../model/entities/customer";

export class ChangeRequestService {
    private changeRequestRepo = AppDataSource.getRepository(ChangeRequest);
    private customerRepo = AppDataSource.getRepository(Customer);
    private classRepo = AppDataSource.getRepository(Class);

    // Tạo yêu cầu thay đổi lớp học hoặc lịch học
    async create(data: CreateChangeRequestDto): Promise<ChangeRequest> {
        const customer = await this.customerRepo.findOneBy({ id: data.customer });
        const classData = await this.classRepo.findOneBy({ id: data.class });

        if (!customer || !classData) {
            throw new Error("Không tìm thấy giáo viên hoặc lớp học");
        }

        const changeRequest = this.changeRequestRepo.create({
            customer,
            class: classData,
            request_type: data.request_type,
            reason: data.reason,
            status: "pending",  // Mặc định là pending khi tạo
        });

        return await this.changeRequestRepo.save(changeRequest);
    }

    // Lấy danh sách yêu cầu của giáo viên
    async listByTeacher(customerId: number, page: number, limit: number): Promise<{ total: number, page: number, limit: number, data: ChangeRequest[] }> {
        const skip = (page - 1) * limit;

        const [data, total] = await this.changeRequestRepo.findAndCount({
            where: { customer: { id: customerId } },
            take: limit,
            skip,
            order: { id: "DESC" },
        });

        return { total, page, limit, data };
    }

    // Lấy danh sách tất cả yêu cầu của admin
    async listAll(page: number, limit: number): Promise<{ total: number, page: number, limit: number, data: ChangeRequest[] }> {
        const skip = (page - 1) * limit;

        const [data, total] = await this.changeRequestRepo.findAndCount({
            take: limit,
            skip,
            order: { id: "DESC" },
        });

        return { total, page, limit, data };
    }

    // Cập nhật trạng thái yêu cầu (phê duyệt hoặc từ chối)
    async update(id: number, data: UpdateChangeRequestDto): Promise<ChangeRequest> {
        const changeRequest = await this.changeRequestRepo.findOneBy({ id });

        if (!changeRequest) {
            throw new Error("Không tìm thấy yêu cầu");
        }

        changeRequest.status = data.status;

        if (data.rejected_reason && data.status === "decline") {
            changeRequest.rejected_reason = data.rejected_reason;
        }

        return await this.changeRequestRepo.save(changeRequest);
    }
}