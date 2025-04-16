import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AcademicYear {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    year_name: string;
}