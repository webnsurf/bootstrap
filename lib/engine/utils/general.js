"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.getFiles = (directoryPath) => (fs_extra_1.default.readdirSync(directoryPath));
exports.getReusableFiles = () => {
    const sourcePath = path_1.default.join(__dirname, '../../templates/reusable-files');
    return exports.getFiles(sourcePath).reduce((data, filePath) => (Object.assign(Object.assign({}, data), { [filePath.replace(/\..+$/, '')]: fs_extra_1.default.readFileSync(path_1.default.join(sourcePath, filePath), 'utf8') })), {});
};
