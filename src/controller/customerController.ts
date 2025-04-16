import { Request, Response } from "express";
import { CustomerService } from "../service/customerService";

export class CustomerController {
    private readonly customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const customer = await this.customerService.createCustomer(req.body);

            return res.status(201).send({ status: 201, message: 'Tạo tài khoản thành công', data: customer });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.customerService.login(req.body);

            return res.status(200).send({ status: 200, message: 'Đăng nhập thành công', accessToken: token });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string || '';

            const customers = await this.customerService.list(page, limit, search);
            return res.status(200).send({ status: 200, message: 'Lấy danh sách giá viên thành công', data: customers });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const customerId = Number(req.params.id);

            const customer = await this.customerService.detail(customerId);

            return res.status(200).send({ status: 200, message: 'Lấy thông tin giáo viên thành công', data: customer });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const customerId = Number(req.params.id);

            const customer = await this.customerService.remove(customerId);

            return res.status(200).send({ status: 200, message: 'Xoá giáo viên thành công', data: customer });
        } catch (error) {
            return res.status(500).send({ status: 500, message: 'Có lỗi trong quá trình xử lý', error: error.message });
        }
    }
}