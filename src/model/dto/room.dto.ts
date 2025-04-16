export class CreateRoomDto {
    name: string;
    room_type?: "lecture" | "lab";
    status?: "available" | "reserved" | "use";
}

export class UpdateRoomDto {
    name?: string;
    room_type?: "lecture" | "lab";
    status?: "available" | "reserved" | "use";
}
