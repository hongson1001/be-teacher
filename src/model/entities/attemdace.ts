import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer";
import { Class } from "./class";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.id)
    customer: Customer;

    @ManyToOne(() => Class, (classData) => classData.id)
    class: Class;

    @Column()
    date: Date;

    @Column({ type: "enum", enum: ["present", "absent"] })
    status: string;
}