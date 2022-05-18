"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/all', user_1.getAllUser);
router.get('/profile', passport_1.default.authenticate('jwt', { session: false }), user_1.getProfile);
router.get('/:userId', passport_1.default.authenticate('jwt', { session: false }), user_1.findUserById);
router.post('/sign-up', user_1.createUser);
router.post('/sign-in', user_1.logInUser);
router.post('/google-login', passport_1.default.authenticate('google-id-token', { session: false }), user_1.googleLogin);
router.put('/:userId', user_1.updateUser);
router.put('/', passport_1.default.authenticate('jwt', { session: false }), user_1.updateAuthenticatedUser);
exports.default = router;
//# sourceMappingURL=user.js.map