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
exports.jwtStrategy = exports.googleStrategy = void 0;
// declearation merging
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const secrets_1 = require("../util/secrets");
const user_1 = __importDefault(require("../services/user"));
exports.googleStrategy = new passport_google_id_token_1.default({
    clientId: secrets_1.GOOGLE_CLIENT_ID,
}, (parseToken, __googleId, done) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist in database
    const user = yield user_1.default.findOrCreate(parseToken);
    return done(null, user);
}));
exports.jwtStrategy = new passport_jwt_1.default.Strategy({
    secretOrKey: secrets_1.JWT_SECRET,
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const user = yield user_1.default.findByEmail(email);
    done(null, user);
}));
//# sourceMappingURL=passport.js.map