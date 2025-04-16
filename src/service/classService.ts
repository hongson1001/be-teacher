import { Like } from "typeorm";
import { AppDataSource } from "../model/db";
import { CreateClassDto, UpdateClassDto } from "../model/dto/class.dto";
import { AcademicYear } from "../model/entities/academic-years";
import { Class } from "../model/entities/class";
import { Course } from "../model/entities/courses";
import { Semester } from "../model/entities/semesters";

export class ClassService {
    private classRepo = AppDataSource.getRepository(Class);
    private courseRepo = AppDataSource.getRepository(Course);
    private semesterRepo = AppDataSource.getRepository(Semester);
    private academicYearRepo = AppDataSource.getRepository(AcademicYear);

    async create(data: CreateClassDto): Promise<Class> {
        const course = await this.courseRepo.findOneBy({ id: data.course });
        if (!course) throw new Error("Không tìm thấy khóa học");
    
        const semester = await this.semesterRepo.findOneBy({ id: data.semester });
        if (!semester) throw new Error("Không tìm thấy học kỳ");
    
        const academicYear = await this.academicYearRepo.findOneBy({ id: data.academic_year });
        if (!academicYear) throw new Error("Không tìm thấy năm học");
    
        const newClass = this.classRepo.create({
            code: data.code,
            name: data.name,
            course,
            semester,
            academic_year: academicYear,
        });
    
        return await this.classRepo.save(newClass);
    }
    

    async modify(classId: number, data: UpdateClassDto): Promise<Class> {
        const existing = await this.classRepo.findOneBy({ id: classId });
        if (!existing) throw new Error("Không tìm thấy lớp học");
    
        if (data.course) {
            const course = await this.courseRepo.findOneBy({ id: data.course });
            if (!course) throw new Error("Không tìm thấy khóa học");
            existing.course = course;
        }
    
        if (data.semester) {
            const semester = await this.semesterRepo.findOneBy({ id: data.semester });
            if (!semester) throw new Error("Không tìm thấy học kỳ");
            existing.semester = semester;
        }
    
        if (data.academic_year) {
            const academicYear = await this.academicYearRepo.findOneBy({ id: data.academic_year });
            if (!academicYear) throw new Error("Không tìm thấy năm học");
            existing.academic_year = academicYear;
        }
    
        if (data.code) existing.code = data.code;
        if (data.name) existing.name = data.name;
    
        return await this.classRepo.save(existing);
    }

    async remove(classId: number): Promise<string> {
        const found = await this.classRepo.findOneBy({ id: classId });
        if (!found) throw new Error("Không tìm thấy lớp học");

        await this.classRepo.remove(found);
        return "Xóa lớp học thành công";
    }

    async detail(classId: number): Promise<Class> {
        const found = await this.classRepo.findOne({
            where: { id: classId },
            relations: ["course", "semester", "academic_year"]
        });
        if (!found) throw new Error("Không tìm thấy lớp học");

        return found;
    }

    async list(page = 1, limit = 10, search = ""): Promise<{ total: number, page: number, limit: number, data: Class[] }> {
        const skip = (page - 1) * limit;

        const [data, total] = await this.classRepo.findAndCount({
            where: search ? [
                { code: Like(`%${search}%`) },
                { name: Like(`%${search}%`) }
            ] : {},
            take: limit,
            skip,
            relations: ["course", "semester", "academic_year"],
            order: { id: "DESC" }
        });

        return { total, page, limit, data };
    }
}