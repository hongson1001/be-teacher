export class CreateChangeRequestDto {
    customer: number;    // ID của giáo viên
    class: number;       // ID của lớp học
    request_type: "change_class" | "change_schedule";  // Loại yêu cầu
    reason?: string;     // Lý do yêu cầu thay đổi
}

export class UpdateChangeRequestDto {
    status: "completed" | "decline";  // Trạng thái yêu cầu
    rejected_reason?: string;         // Lý do từ chối (nếu có)
}
