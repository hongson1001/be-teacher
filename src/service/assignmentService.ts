import { AppDataSource } from "../model/db";
import { CreateAssignmentDto, UpdateAssignmentDto } from "../model/dto/assignment.dto";
import { Assignment } from "../model/entities/assignments";
import { Class } from "../model/entities/class";
import { Customer } from "../model/entities/customer";
import { Room } from "../model/entities/rooms";

export class AssignmentService {
    private assignmentRepo = AppDataSource.getRepository(Assignment);
    private customerRepo = AppDataSource.getRepository(Customer);
    private classRepo = AppDataSource.getRepository(Class);
    private roomRepo = AppDataSource.getRepository(Room);

    async create(data: CreateAssignmentDto): Promise<Assignment> {
        const customer = await this.customerRepo.findOneBy({ id: data.customer });
        if (!customer) throw new Error("Không tìm thấy giáo viên");

        const classData = await this.classRepo.findOneBy({ id: data.class });
        if (!classData) throw new Error("Không tìm thấy lớp học");

        const room = await this.roomRepo.findOneBy({ id: data.room });
        if (!room) throw new Error("Không tìm thấy phòng học");

        const assignment = this.assignmentRepo.create({
            customer,
            class: classData,
            room,
            date: data.date,
            start_time: data.start_time,
            end_time: data.end_time,
        });

        return await this.assignmentRepo.save(assignment);
    }

    // Cập nhật phân công
    async modify(assignmentId: number, data: UpdateAssignmentDto): Promise<Assignment> {
        const existingAssignment = await this.assignmentRepo.findOneBy({ id: assignmentId });
        if (!existingAssignment) throw new Error("Không tìm thấy phân công");

        if (data.customer) {
            const customer = await this.customerRepo.findOneBy({ id: data.customer });
            if (customer) existingAssignment.customer = customer;
        }

        if (data.class) {
            const classData = await this.classRepo.findOneBy({ id: data.class });
            if (classData) existingAssignment.class = classData;
        }

        if (data.room) {
            const room = await this.roomRepo.findOneBy({ id: data.room });
            if (room) existingAssignment.room = room;
        }

        if (data.date) existingAssignment.date = data.date;
        if (data.start_time) existingAssignment.start_time = data.start_time;
        if (data.end_time) existingAssignment.end_time = data.end_time;

        return await this.assignmentRepo.save(existingAssignment);
    }

    // Xóa phân công
    async remove(assignmentId: number): Promise<string> {
        const assignment = await this.assignmentRepo.findOneBy({ id: assignmentId });
        if (!assignment) throw new Error("Không tìm thấy phân công");

        await this.assignmentRepo.remove(assignment);
        return "Xóa phân công thành công";
    }

    // Lấy danh sách phân công
    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, data: Assignment[] }> {
        const skip = (page - 1) * limit;
    
        // Tạm chưa áp dụng search theo date vì không hợp lý với like %
        const [data, total] = await this.assignmentRepo.findAndCount({
            take: limit,
            skip,
            order: { id: "DESC" },
            relations: ["customer", "class", "room"], // nếu muốn hiển thị đầy đủ
        });
    
        return { total, page, limit, data };
    }
    

    async listByTeacher(customerId: number, page: number, limit: number): Promise<{ total: number, page: number, limit: number, data: Assignment[] }> {
        const skip = (page - 1) * limit;
    
        const [data, total] = await this.assignmentRepo.findAndCount({
            where: { customer: { id: customerId } },
            take: limit,
            skip,
            relations: ["class", "room"], // nếu muốn hiện thêm thông tin lớp và phòng
            order: { date: "ASC", start_time: "ASC" },
        });
    
        return { total, page, limit, data };
    }

    // Lấy thông tin phân công
    async detail(assignmentId: number): Promise<Assignment> {
        const assignment = await this.assignmentRepo.findOneBy({ id: assignmentId });
        if (!assignment) throw new Error("Không tìm thấy phân công");

        return assignment;
    }
}