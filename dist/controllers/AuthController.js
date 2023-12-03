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
exports.register = exports.login = exports.getAll = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @Desc Get all users
// @Route /api/auth
// @Method GET
exports.getAll = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({}).select("-password");
    res.status(201).json({ success: true, count: users.length, users });
}));
// @Desc Login
// @Route /api/auth/
// @Method POST
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    if (yield user.comparePassword(password)) {
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                token: (0, generateToken_1.default)(user._id),
            },
        });
    }
    else {
        res.status(401);
        throw new Error("Email or password incorrect");
    }
}));
// @Desc Register
// @Route /api/auth/register
// @Method POST
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const user = new User_1.default({
            email,
            password,
        });
        yield user.save();
        res.status(201).json({
            success: true,
            user: {
                email: user.email,
                token: (0, generateToken_1.default)(user._id),
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
//# sourceMappingURL=AuthController.js.map