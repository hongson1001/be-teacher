import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { AppDataSource } from '../model/db';
import { Admin } from '../model/entities/admin';
import { CreateAdminDto, LoginAdminDto } from '../model/dto/admin.dto';

dotenv.config();

export class AdminService {
    private adminRepository = AppDataSource.getRepository(Admin);

    async createAdmin(data: CreateAdminDto): Promise<Admin> {
        const existingAdmin = await this.adminRepository.findOne({
            where: {
                username: data.username,
            }
        });
        if (existingAdmin) {
            throw new Error('Tài khoản đã tồn tại');
        }

        const hassPass = await bcrypt.hash(data.password, 10);
        const admin = this.adminRepository.create({
            ...data,
            password: hassPass,
        });
        await this.adminRepository.save(admin);
        return admin;
    }

    async login(data: LoginAdminDto): Promise<any> {
        const admin = await this.adminRepository.findOne({
            where: {
                username: data.username,
            }
        });
        if (!admin || !(await bcrypt.compare(data.password, admin.password))) {
            throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }

        const payload = {
            username: admin.username,
            sub: admin.id,
        };
        if (!process.env.ADMIN_SECRET_KEY) {
            throw new Error('ADMIN_SECRET_KEY is not defined');
        }

        const token = jwt.sign(payload, process.env.ADMIN_SECRET_KEY, { expiresIn: '24h' });

        return token;
    }
}