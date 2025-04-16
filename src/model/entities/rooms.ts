import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assignment } from "./assignments";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: "enum", enum: ["lecture", "lab"], default: "lecture" })
    room_type: string;

    @Column({ type: "enum", enum: ["available", "reserved", "use"] })
    status: string;

    @OneToMany(() => Assignment, (assignment) => assignment.room)
    assignments: Assignment[];
}