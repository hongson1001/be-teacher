import { Like } from "typeorm";
import { AppDataSource } from "../model/db";
import { CreateAcademicYearDto, UpdateAcademicYearDto } from "../model/dto/academic-year.dto";
import { AcademicYear } from "../model/entities/academic-years";

export class AcademicYearService {
    private academicYearRepository = AppDataSource.getRepository(AcademicYear);

    async create(data: CreateAcademicYearDto): Promise<AcademicYear> {
        const academicYear = this.academicYearRepository.create(data);
        await this.academicYearRepository.save(academicYear);

        return academicYear;
    }

    async modify(academicYearId: number, data: UpdateAcademicYearDto): Promise<AcademicYear> {
        const academicYear = await this.academicYearRepository.preload({
            id: academicYearId,
            ...data,
        });
        if (!academicYear) {
            throw new Error("Không tìm thấy năm học");
        }

        await this.academicYearRepository.save(academicYear);

        return academicYear;
    }

    async remove(academicYearId: number): Promise<any> {
        const academicYear = await this.academicYearRepository.findOne({
            where: {
                id: academicYearId,
            }
        });
        if (!academicYear) {
            throw new Error("Không tìm thấy năm học");
        }

        await this.academicYearRepository.remove(academicYear);

        return "Xóa năm học thành công";
    }

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, data: AcademicYear[] }> {
        const skip = (page - 1) * limit;

        let whereCondition = {};

        if (search?.trim()) {
            whereCondition = [
                { year_name: Like(`%${search}`) },
            ];
        }

        const [data, total] = await this.academicYearRepository.findAndCount({
            where: whereCondition,
            take: limit,
            skip: skip,
            order: {
                id: "DESC",
            },
        });

        return { total, page, limit, data };
    }

    async detail(academicYearId: number): Promise<AcademicYear> {
        const academicYear = await this.academicYearRepository.findOne({
            where: {
                id: academicYearId,
            }
        });
        if (!academicYear) {
            throw new Error("Không tìm thấy năm học");
        }

        return academicYear;
    }
}