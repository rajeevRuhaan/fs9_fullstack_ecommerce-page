"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const validator = require('validator');
const validator_1 = __importDefault(require("validator"));
// User model entity
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'Please tell us your first name!'],
    },
    lastName: {
        type: String,
        require: [true, 'Please tell your last name!'],
    },
    email: {
        type: String,
        require: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
    },
    isAdmin: { type: Boolean, default: false },
    image: { type: String },
    registeredDate: {
        type: Date,
    },
    profile: {
        address: { type: String },
        phone: { type: String },
    },
    order: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'OrderDetail' }],
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map