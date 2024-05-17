"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partidoRouter = exports.torneoRouter = exports.equipoRouter = void 0;
const equipo_1 = __importDefault(require("./equipo"));
exports.equipoRouter = equipo_1.default;
const torneo_1 = __importDefault(require("./torneo"));
exports.torneoRouter = torneo_1.default;
const partido_1 = __importDefault(require("./partido"));
exports.partidoRouter = partido_1.default;
