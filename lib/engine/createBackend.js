"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("./utils");
const templatesPath = path_1.default.join(__dirname, '../templates/backend');
exports.createBackend = (options, destinationPath) => {
    const { withLogin, withGit, withDocker } = options;
    const getFolders = () => {
        const folders = [path_1.default.join(templatesPath, 'common')];
        if (withGit) {
            folders.push(path_1.default.join(templatesPath, 'with-git'));
        }
        if (withDocker) {
            folders.push(path_1.default.join(templatesPath, 'with-docker'));
        }
        if (withLogin) {
            folders.push(path_1.default.join(templatesPath, 'with-login'));
        }
        return folders;
    };
    fs_extra_1.default.ensureDirSync(destinationPath);
    utils_1.mergeFolders(getFolders(), destinationPath, options);
    fs_extra_1.default.writeFileSync(path_1.default.join(destinationPath, 'package.json'), utils_1.getBackendPackage(options));
};
