export class CreateAssignmentDto {
    customer: number; // ID của giáo viên
    class: number;    // ID của lớp
    room: number;     // ID của phòng học
    date: Date;
    start_time: string;
    end_time: string;
}

export class UpdateAssignmentDto {
    customer?: number;  // ID của giáo viên
    class?: number;     // ID của lớp
    room?: number;      // ID của phòng học
    date?: Date;
    start_time?: string;
    end_time?: string;
}
