"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = require("../helpers/apiError");
const OrderDetail_1 = __importDefault(require("../models/OrderDetail"));
const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return order.save();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOrderList = OrderDetail_1.default.find().populate('user').populate('product');
    if (!allOrderList) {
        throw new apiError_1.NotFoundError('Order list not found');
    }
    return allOrderList;
});
const findOne = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = OrderDetail_1.default.findById(orderId)
        .populate({ path: 'product', populate: { path: 'color category' } })
        .populate('user');
    if (!foundOrder) {
        throw new apiError_1.NotFoundError(`Order ${orderId} not found`);
    }
    return foundOrder;
});
const deleteOne = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = OrderDetail_1.default.findByIdAndDelete(orderId);
    if (!foundOrder) {
        throw new apiError_1.NotFoundError(`Product ${orderId} not found`);
    }
    return foundOrder;
});
exports.default = { create, findAll, findOne, deleteOne };
//# sourceMappingURL=orderDetail.js.map