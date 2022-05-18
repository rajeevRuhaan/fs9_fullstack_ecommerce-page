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
exports.getProfile = exports.googleLogin = exports.updateAuthenticatedUser = exports.updateUser = exports.findUserById = exports.getAllUser = exports.logInUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
// POST
//@route api/v1/user
//@desc sign-up route
//@ access Public
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // destructure req.body object
        const { firstName, lastName, email, password } = req.body;
        console.log('req.body', req.body);
        // 1)) check if user exist
        const userExists = yield User_1.default.findOne({ email: email });
        if (userExists) {
            return next(new apiError_1.DuplicateEntityError('email already exist. Please login!'));
        }
        // 2)) Encrypt password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const encryptedPassword = yield bcryptjs_1.default.hash(password, salt);
        // define current date
        const date = new Date().toUTCString();
        // Create user
        const user = new User_1.default({
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: '',
            registeredDate: date,
            order: [],
            profile: { address: '', phone: '' },
            password: encryptedPassword,
        });
        // Save into database
        yield user_1.default.create(user);
        const token = jsonwebtoken_1.default.sign({ email: user === null || user === void 0 ? void 0 : user.email }, secrets_1.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(201).json({ user, token });
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.logInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield user_1.default.findByEmail(email);
        if (!foundUser) {
            throw new apiError_1.NotFoundError('Invalid Credintial');
        }
        const isMatched = yield bcryptjs_1.default.compare(password, foundUser.password);
        if (!isMatched) {
            throw new apiError_1.NotFoundError('Invalid Credintial');
        }
        const token = jsonwebtoken_1.default.sign({ email: foundUser === null || foundUser === void 0 ? void 0 : foundUser.email }, secrets_1.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.json({ foundUser, token });
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findAll());
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.findOne(req.params.userId));
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// PUT /users/:userId
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updateUser = yield user_1.default.update(userId, update);
        res.json(updateUser);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.updateAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('updateAuthenticateUser:', req.body);
        const updated = yield user_1.default.updateAuthenticated(req.body);
        res.json(updated);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.googleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user ? req.user : null;
        const token = jsonwebtoken_1.default.sign({ email: user === null || user === void 0 ? void 0 : user.email }, secrets_1.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.json({ user, token });
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('getprofile', req.user);
        res.json(yield user_1.default.findProfile(req.user._id));
    }
    catch (error) {
        if (error instanceof mongoose_1.Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=user.js.map