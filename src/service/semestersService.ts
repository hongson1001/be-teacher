import { AppDataSource } from "../model/db";
import { CreateSemesterDto, UpdateSemesterDto } from "../model/dto/semester.dto";
import { AcademicYear } from "../model/entities/academic-years";
import { Semester } from "../model/entities/semesters";

export class SemesterService {
    private semesterRepository = AppDataSource.getRepository(Semester);
    private academicYearRepository = AppDataSource.getRepository(AcademicYear);

    async create(data: CreateSemesterDto): Promise<Semester> {
        const academicYear = await this.academicYearRepository.findOneBy({ id: data.academic_year });
        if (!academicYear) throw new Error("Không tìm thấy năm học");

        const semester = this.semesterRepository.create({
            semester_name: data.semester_name,
            academic_year: academicYear,
        });

        await this.semesterRepository.save(semester);
        return semester;
    }

    async modify(semesterId: number, data: UpdateSemesterDto): Promise<Semester> {
        const semester = await this.semesterRepository.findOne({
            where: { id: semesterId },
            relations: ["academic_year"],
        });
        if (!semester) throw new Error("Không tìm thấy học kỳ");

        if (data.semester_name) semester.semester_name = data.semester_name;

        if (data.academic_year) {
            const academicYear = await this.academicYearRepository.findOneBy({ id: data.academic_year });
            if (!academicYear) throw new Error("Không tìm thấy năm học mới");
            semester.academic_year = academicYear;
        }

        await this.semesterRepository.save(semester);
        return semester;
    }

    async remove(semesterId: number): Promise<string> {
        const semester = await this.semesterRepository.findOne({ where: { id: semesterId } });
        if (!semester) throw new Error("Không tìm thấy học kỳ");

        await this.semesterRepository.remove(semester);
        return "Xóa học kỳ thành công";
    }

    async list(page: number, limit: number): Promise<{ total: number; page: number; limit: number; data: Semester[] }> {
        const skip = (page - 1) * limit;

        const [data, total] = await this.semesterRepository.findAndCount({
            take: limit,
            skip,
            relations: ["academic_year"],
            order: { id: "DESC" },
        });

        return { total, page, limit, data };
    }

    async detail(semesterId: number): Promise<Semester> {
        const semester = await this.semesterRepository.findOne({
            where: { id: semesterId },
            relations: ["academic_year"],
        });

        if (!semester) throw new Error("Không tìm thấy học kỳ");
        return semester;
    }
}