"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("./utils");
exports.createCommon = (options, destinationPath) => {
    const { withBackend, withDocker, withPipeline } = options;
    const templatesPath = path_1.default.join(__dirname, withBackend
        ? '../templates/common/with-backend'
        : '../templates/common/simple');
    fs_extra_1.default.ensureDirSync(destinationPath);
    const getFolders = () => {
        const folders = withBackend
            ? [path_1.default.join(templatesPath, 'common')]
            : [];
        if (withDocker) {
            folders.push(path_1.default.join(templatesPath, 'with-docker'));
        }
        if (withPipeline) {
            folders.push(path_1.default.join(templatesPath, 'with-pipeline'));
        }
        return folders;
    };
    utils_1.mergeFolders(getFolders(), destinationPath, options);
    if (options.withGit) {
        fs_extra_1.default.writeFileSync(path_1.default.join(destinationPath, '.gitignore'), 'node_modules/\ndist/\n');
    }
    child_process_1.exec('make --version', err => {
        if (err) {
            return fs_extra_1.default.unlinkSync(path_1.default.resolve(destinationPath, 'Makefile'));
        }
    });
};
