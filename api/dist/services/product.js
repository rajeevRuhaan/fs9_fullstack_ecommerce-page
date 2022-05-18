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
const Product_1 = __importDefault(require("../models/Product"));
const create = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return product.save();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Product_1.default.find().populate("category color");
});
const findOne = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = Product_1.default.findById(productId).populate("category color");
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} not found`);
    }
    return foundProduct;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = Product_1.default.findByIdAndDelete(productId);
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} not found`);
    }
    return foundProduct;
});
const updateProduct = (productId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProduct = Product_1.default.findByIdAndUpdate(productId, update, { new: true });
    if (!updateProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} not found`);
    }
    return updateProduct;
});
exports.default = { create, findAll, findOne, deleteProduct, updateProduct };
//# sourceMappingURL=product.js.map