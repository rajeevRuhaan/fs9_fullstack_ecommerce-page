"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderDetail_1 = require("../controllers/orderDetail");
const router = express_1.default.Router();
router.post('/', orderDetail_1.createOrderDetail);
router.get('/all', orderDetail_1.getAllOrder);
router.get('/:orderId', orderDetail_1.findOrderById);
router.get('/:orderId', orderDetail_1.deleteOrderById);
exports.default = router;
//# sourceMappingURL=orderDetail.js.map