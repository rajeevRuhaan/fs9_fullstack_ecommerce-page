"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, index: true, require: true },
    SKU: { type: String, require: true },
    image: { type: String },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    sex: { type: String, require: true },
    color: { type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Color" }] },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
    stock: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Stock' },
});
exports.default = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=Product.js.map