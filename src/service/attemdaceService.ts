import { AppDataSource } from "../model/db";
import { CreateAttendanceDto, UpdateAttendanceDto } from "../model/dto/attemdace.dto";
import { Attendance } from "../model/entities/attemdace";
import { Class } from "../model/entities/class";
import { Customer } from "../model/entities/customer";

export class AttendanceService {
    private attendanceRepo = AppDataSource.getRepository(Attendance);
    private classRepo = AppDataSource.getRepository(Class);
    private customerRepo = AppDataSource.getRepository(Customer);

    // Tạo điểm danh mới
    async create(data: CreateAttendanceDto): Promise<Attendance> {
        const classData = await this.classRepo.findOne({ where: { id: data.class } });
        const customer = await this.customerRepo.findOne({ where: { id: data.customer } });
    
        // Kiểm tra nếu không tìm thấy lớp học hoặc giáo viên
        if (!classData || !customer) {
            throw new Error("Không tìm thấy lớp học hoặc giáo viên");
        }
    
        // Tạo mới đối tượng điểm danh và gán đầy đủ các đối tượng liên quan
        const attendance = this.attendanceRepo.create({
            class: classData,  // Gán đối tượng Class
            customer: customer, // Gán đối tượng Customer
            date: data.date,
            status: data.status,
        });
    
        return await this.attendanceRepo.save(attendance);
    }

    // Cập nhật điểm danh
    async modify(id: number, data: UpdateAttendanceDto): Promise<Attendance> {
        const attendance = await this.attendanceRepo.findOne({ where: { id } });
    
        // Kiểm tra nếu không tìm thấy điểm danh
        if (!attendance) {
            throw new Error("Không tìm thấy điểm danh");
        }
    
        // Cập nhật các trường cần thiết
        if (data.customer) {
            const customer = await this.customerRepo.findOne({ where: { id: data.customer } });
            if (customer) attendance.customer = customer; // Cập nhật customer
        }
        if (data.class) {
            const classData = await this.classRepo.findOne({ where: { id: data.class } });
            if (classData) attendance.class = classData; // Cập nhật class
        }
        if (data.date) attendance.date = data.date; // Cập nhật date
        if (data.status) attendance.status = data.status; // Cập nhật status
    
        return await this.attendanceRepo.save(attendance);
    }

    // Lấy danh sách điểm danh
    async list(page: number, limit: number): Promise<{ total: number, page: number, limit: number, data: Attendance[] }> {
        const skip = (page - 1) * limit;
        const [data, total] = await this.attendanceRepo.findAndCount({
            take: limit,
            skip,
            order: { id: "DESC" },
        });

        return { total, page, limit, data };
    }

    // Lấy chi tiết điểm danh
    async detail(id: number): Promise<Attendance> {
        const attendance = await this.attendanceRepo.findOne({ where: { id } });

        if (!attendance) {
            throw new Error("Không tìm thấy điểm danh");
        }

        return attendance;
    }
}