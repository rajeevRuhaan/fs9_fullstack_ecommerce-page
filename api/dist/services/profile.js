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
exports.findOne = exports.findAll = exports.create = void 0;
const apiError_1 = require("../helpers/apiError");
const Profile_1 = __importDefault(require("../models/Profile"));
exports.create = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    return profile.save();
});
exports.findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Profile_1.default.find();
});
exports.findOne = (profileId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProfile = Profile_1.default.findById(profileId);
    if (!foundProfile) {
        throw new apiError_1.NotFoundError(`Profile ${profileId} not found`);
    }
    return foundProfile;
});
exports.default = { create: exports.create, findAll: exports.findAll, findOne: exports.findOne };
//# sourceMappingURL=profile.js.map