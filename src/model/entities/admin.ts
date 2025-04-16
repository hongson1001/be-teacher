import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    password: string;

    @Column({type: "enum", enum: ["active", "unactive"], default: "active"})
    status: string;
}