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
exports.isAdmin = exports.isAuth = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
    }, 'supersecret', {
        expiresIn: '1d',
    });
};
exports.signToken = signToken;
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        // Bearer xxx => xxx
        const token = authorization.slice(7, authorization.length);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Token is not valid' });
            }
            else {
                req.user = decode;
                next();
            }
        });
    }
    else {
        res.status(401).send({ message: 'Token is not suppiled' });
    }
});
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.isAdmin) {
        next();
    }
    else {
        res.status(401).send({ message: 'User is not admin' });
    }
});
exports.isAdmin = isAdmin;
