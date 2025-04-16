import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./courses";
import { Semester } from "./semesters";
import { AcademicYear } from "./academic-years";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: "enum", enum: ["active", "unactive"], default: "active" })
    status: string;

    @ManyToOne(() => Course, (course) => course.id)
    course: Course;

    @ManyToOne(() => Semester, (semester) => semester.id)
    semester: Semester;

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear.id)
    academic_year: AcademicYear;
}