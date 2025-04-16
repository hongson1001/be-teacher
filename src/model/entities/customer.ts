import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    password: string;

    @Column()
    name: string;

    @Column({type: "enum", enum: ["admin", "teacher"], default: "teacher"})
    role: string;

    @Column({type: "enum", enum: ["active", "unactive"], default: "active"})
    status: string;
}