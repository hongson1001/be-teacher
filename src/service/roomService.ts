import { AppDataSource } from "../model/db";
import { CreateRoomDto, UpdateRoomDto } from "../model/dto/room.dto";
import { Room } from "../model/entities/rooms";

export class RoomService {
    private roomRepo = AppDataSource.getRepository(Room);

    async create(data: CreateRoomDto): Promise<Room> {
        const roomExist = await this.roomRepo.findOneBy({ name: data.name });
        if (roomExist) throw new Error("Phòng đã tồn tại");

        const room = this.roomRepo.create({
            name: data.name,
            room_type: data.room_type || "lecture",
            status: data.status || "available",
        });
        return await this.roomRepo.save(room);
    }

    async modify(roomId: number, data: UpdateRoomDto): Promise<Room> {
        const room = await this.roomRepo.findOneBy({ id: roomId });
        if (!room) throw new Error("Không tìm thấy phòng");

        if (data.name) room.name = data.name;
        if (data.room_type) room.room_type = data.room_type;
        if (data.status) room.status = data.status;

        return await this.roomRepo.save(room);
    }

    async remove(roomId: number): Promise<string> {
        const room = await this.roomRepo.findOneBy({ id: roomId });
        if (!room) throw new Error("Không tìm thấy phòng");

        await this.roomRepo.remove(room);
        return "Xóa phòng thành công";
    }

    async list(page: number, limit: number, search?: string): Promise<{ total: number, page: number, limit: number, data: Room[] }> {
        const skip = (page - 1) * limit;

        const [data, total] = await this.roomRepo.findAndCount({
            where: search
                ? { name: AppDataSource.getRepository(Room).manager.connection.driver.escape(`%${search}%`) }
                : {},
            take: limit,
            skip,
            order: { id: "DESC" },
        });

        return { total, page, limit, data };
    }

    async detail(roomId: number): Promise<Room> {
        const room = await this.roomRepo.findOneBy({ id: roomId });
        if (!room) throw new Error("Không tìm thấy phòng");

        return room;
    }
}