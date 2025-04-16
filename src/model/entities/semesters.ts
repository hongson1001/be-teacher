import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcademicYear } from "./academic-years";

@Entity()
export class Semester {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["semester_1", "semester_2"], default: "semester_1" })
    semester_name: string;

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear.id)
    academic_year: AcademicYear;
}