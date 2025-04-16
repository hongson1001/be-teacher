import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { CreateCustomerDto, LoginCustomerDto } from '../model/dto/customer.dto';
import { Customer } from '../model/entities/customer';
import { AppDataSource } from '../model/db';
import { Like } from 'typeorm';

dotenv.config();

export class CustomerService {
    private customerRepository = AppDataSource.getRepository(Customer);

    async createCustomer(data: CreateCustomerDto): Promise<Customer> {
        const existingCustomer = await this.customerRepository.findOne({
            where: {
                username: data.username,
            }
        });
        if (existingCustomer) {
            throw new Error('Tài khoản giáo viên này đãtồn tại');
        }

        const hassPass = await bcrypt.hash(data.password, 10);
        const customer = this.customerRepository.create({
            ...data,
            password: hassPass,
        });
        await this.customerRepository.save(customer);

        return customer;
    }

    async login(data: LoginCustomerDto): Promise<any> {
        const customer = await this.customerRepository.findOne({
            where: {
                username: data.username,
            }
        });
        if (!customer || !(await bcrypt.compare(data.password, customer.password))) {
            throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }

        const payload = {
            username: customer.username,
            sub: customer.id,
        }
        if (!process.env.USER_SECRET_KEY) {
            throw new Error('Token không hợp lệ');
        }

        const token = jwt.sign(payload, process.env.USER_SECRET_KEY, {
            expiresIn: '24h'
        });
        return token;
    }

    async list(page: number, limit: number, search?: string): Promise<{
        total: number, page: number, limit: number, customers: Customer[]
    }> {
        const skip = (page - 1) * limit;
    
        const qb = this.customerRepository.createQueryBuilder('customer');
    
        if (search?.trim()) {
            qb.where('customer.name LIKE :search OR customer.username LIKE :search', {
                search: `%${search}%`
            });
        }
    
        qb.orderBy('customer.id', 'DESC')
          .skip(skip)
          .take(limit);
    
        const [customers, total] = await qb.getManyAndCount();
    
        return { total: customers.length, page, limit, customers };
    }

    async detail(customerId: number): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: {
                id: customerId,
            }
        });
        if (!customer) {
            throw new Error('Không tìm thấy thông tin giáo viên này');
        }

        return customer;
    }

    async remove(customerId: number): Promise<any> {
        const customer = await this.customerRepository.findOne({
            where: {
                id: customerId,
            }
        });
        if (!customer) {
            throw new Error('Không tìm thấy thông tin giáo viên này');
        };

        await this.customerRepository.remove(customer);

        return 'Xoá giáo viên thành công';
    }
}