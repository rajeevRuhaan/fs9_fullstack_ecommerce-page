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
exports.deleteOrderById = exports.findOrderById = exports.getAllOrder = exports.createOrderDetail = void 0;
const orderDetail_1 = __importDefault(require("../services/orderDetail"));
const OrderDetail_1 = __importDefault(require("../models/OrderDetail"));
const apiError_1 = require("../helpers/apiError");
const User_1 = __importDefault(require("../models/User"));
exports.createOrderDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        const { product, user } = req.body;
        const orderDetail = new OrderDetail_1.default({ product, user });
        const result = yield orderDetail_1.default.create(orderDetail);
        if (result._id) {
            yield User_1.default.updateOne({ _id: user }, { $push: { order: result._id } });
        }
        res.json('success');
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield orderDetail_1.default.findAll());
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield orderDetail_1.default.findOne(req.params.orderId));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
//# sourceMappingURL=orderDetail.js.map