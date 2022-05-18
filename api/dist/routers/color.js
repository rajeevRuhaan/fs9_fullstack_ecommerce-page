"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const color_1 = require("../controllers/color");
const router = express_1.default.Router();
router.post('/', color_1.createColor);
router.get('/', color_1.findAllColor);
exports.default = router;
//# sourceMappingURL=color.js.map