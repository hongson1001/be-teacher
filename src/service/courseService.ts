import { Like } from "typeorm";
import { AppDataSource } from "../model/db";
import { CreateCourseDto, UpdateCourseDto } from "../model/dto/course.dto";
import { Course } from "../model/entities/courses";

export class CourseService {
    private courseRepo = AppDataSource.getRepository(Course);

    async create(data: CreateCourseDto): Promise<Course> {
        const course = this.courseRepo.create(data);
        return await this.courseRepo.save(course);
    }

    async modify(courseId: number, data: UpdateCourseDto): Promise<Course> {
        const course = await this.courseRepo.preload({
            id: courseId,
            ...data
        });
        if (!course) {
            throw new Error("Không tìm thấy môn học");
        }
        return await this.courseRepo.save(course);
    }

    async remove(courseId: number): Promise<string> {
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!course) {
            throw new Error("Không tìm thấy môn học");
        }
        await this.courseRepo.remove(course);
        return "Xóa môn học thành công";
    }

    async detail(courseId: number): Promise<Course> {
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!course) {
            throw new Error("Không tìm thấy môn học");
        }
        return course;
    }

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, data: Course[] }> {
        const skip = (page - 1) * limit;
        const where = search?.trim() ? [
            { name: Like(`%${search}%`) },
            { code: Like(`%${search}%`) }
        ] : {};

        const [data, total] = await this.courseRepo.findAndCount({
            where,
            skip,
            take: limit,
            order: { id: "DESC" }
        });

        return { total, page, limit, data };
    }
}