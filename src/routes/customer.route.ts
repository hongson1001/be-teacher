import { Router } from "express";
import { CustomerController } from "../controller/customerController";

const router = Router();
const customerController = new CustomerController();

router.post("/create", customerController.createCustomer.bind(customerController));
router.post("/login", customerController.login.bind(customerController));
router.get("/", customerController.list.bind(customerController));
router.get("/:id", customerController.detail.bind(customerController));
router.delete("/:id", customerController.remove.bind(customerController));

export default router;