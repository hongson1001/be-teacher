export class CreateSemesterDto {
    semester_name: "semester_1" | "semester_2";
    academic_year: number;
}

export class UpdateSemesterDto {
    semester_name?: "semester_1" | "semester_2";
    academic_year?: number;
}
