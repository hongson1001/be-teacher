import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Customer } from "./entities/customer";
import { Semester } from "./entities/semesters";
import { Course } from "./entities/courses";
import { Room } from "./entities/rooms";
import { Class } from "./entities/class";
import { Assignment } from "./entities/assignments";
import { ChangeRequest } from "./entities/change-request";
import { Attendance } from "./entities/attemdace";
import { AcademicYear } from "./entities/academic-years";
import { Admin } from "./entities/admin";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) as number,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    // migrationsRun: true,
    logging: true,
    entities: [Customer, Semester, Course, Room, Class, Assignment, ChangeRequest, Attendance, AcademicYear, Admin],
    migrations: ["./migrations/*.ts"],
    subscribers: [],
  });