import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer";
import { Class } from "./class";
import { Room } from "./rooms";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.id)
    customer: Customer;

    @ManyToOne(() => Class, (classData) => classData.id)
    class: Class;

    @ManyToOne(() => Room, (room) => room.id)
    room: Room;

    @Column()
    date: Date;

    @Column()
    start_time: string;

    @Column()
    end_time: string;
}