import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer";
import { Class } from "./class";

@Entity()
export class ChangeRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.id)
    customer: Customer;

    @ManyToOne(() => Class, (classData) => classData.id)
    class: Class;

    @Column({ type: "enum", enum: ["change_class", "change_schedule"] })
    request_type: string;

    @Column({ type: "enum", enum: ["pending", "completed", "decline"], default: "pending" })
    status: string;

    @Column({ nullable: true })
    reason: string;

    @Column({ nullable: true })
    rejected_reason: string;
}