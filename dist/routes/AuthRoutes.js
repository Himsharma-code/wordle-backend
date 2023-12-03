"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router.route("/").get(AuthController_1.getAll).post(AuthController_1.login);
router.post("/register", AuthController_1.register);
exports.default = router;
//# sourceMappingURL=AuthRoutes.js.map