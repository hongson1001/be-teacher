// create-attendance.dto.ts
export class CreateAttendanceDto {
    customer: number;  // ID của giảng viên
    class: number;     // ID lớp
    date: Date;        // Ngày điểm danh
    status: "present" | "absent"; // Trạng thái điểm danh
}

// update-attendance.dto.ts
export class UpdateAttendanceDto {
    customer?: number;
    class?: number;
    date?: Date;
    status?: "present" | "absent";
}
