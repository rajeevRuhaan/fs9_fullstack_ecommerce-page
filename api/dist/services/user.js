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
const User_1 = __importDefault(require("../models/User"));
const create = (userDocument) => __awaiter(void 0, void 0, void 0, function* () {
    return userDocument.save();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUserList = User_1.default.find();
    if (!allUserList) {
        throw new apiError_1.NotFoundError('User list is empty');
    }
    return allUserList;
});
const findOrCreate = (parsedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const found = yield User_1.default.findOne({ email: parsedToken.payload.email });
    if (!found) {
        // define current date
        const date = new Date().toUTCString();
        const user = new User_1.default({
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
            email: parsedToken.payload.email,
            image: parsedToken.payload.picture,
            registeredDate: date,
            order: [],
            profile: { address: '', phone: '' },
        });
        return user.save();
    }
    return found;
});
const findProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const found = yield User_1.default.findById(userId);
    if (!found) {
        throw new apiError_1.NotFoundError('User not found');
    }
    return found;
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.findOne({ email });
});
const findOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = User_1.default.findById(userId).populate('profile');
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`Product ${userId} not found`);
    }
    return foundUser;
});
const update = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = User_1.default.findByIdAndUpdate(userId, update, { new: true });
    if (!updateUser) {
        throw new apiError_1.NotFoundError(`Product ${userId} not found`);
    }
    return updateUser;
});
const updateAuthenticated = (update) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(update._id);
    const updated = yield User_1.default.findByIdAndUpdate(update._id, update, {
        new: true,
    });
    if (!updated) {
        throw new apiError_1.NotFoundError(`User of ${update._id} is not found`);
    }
    return updated;
});
exports.default = {
    create,
    findAll,
    findOne,
    update,
    findOrCreate,
    findByEmail,
    findProfile,
    updateAuthenticated,
};
//# sourceMappingURL=user.js.map