"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const movie_1 = __importDefault(require("./routers/movie"));
const user_1 = __importDefault(require("./routers/user"));
const product_1 = __importDefault(require("./routers/product"));
const category_1 = __importDefault(require("./routers/category"));
const color_1 = __importDefault(require("./routers/color"));
const profile_1 = __importDefault(require("./routers/profile"));
const orderDetail_1 = __importDefault(require("./routers/orderDetail"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const passport_2 = require("./config/passport");
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
// Express configuration
app.set('port', process.env.PORT || 3000);
// Global middleware
app.use(cors_1.default());
app.use(apiContentType_1.default);
app.use(express_1.default.json());
// Passport configuration
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.googleStrategy);
passport_1.default.use(passport_2.jwtStrategy);
// Set up routers
app.use('/api/v1/movies', movie_1.default);
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/product', product_1.default);
app.use('/api/v1/category', category_1.default);
app.use('/api/v1/color', color_1.default);
app.use('/api/v1/profile', profile_1.default);
app.use('/api/v1/order', orderDetail_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map