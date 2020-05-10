"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("./utils");
const templatesPath = path_1.default.join(__dirname, '../templates/frontend');
exports.createFrontend = (options, destinationPath) => {
    const { withGit, withDocker, withRouter, withLogin, designLibrary } = options;
    fs_extra_1.default.ensureDirSync(destinationPath);
    const getFolders = () => {
        const folders = [path_1.default.join(templatesPath, 'common')];
        if (withGit) {
            folders.push(path_1.default.join(templatesPath, 'with-git'));
        }
        if (withDocker) {
            folders.push(path_1.default.join(templatesPath, 'with-docker'));
        }
        if (withRouter) {
            folders.push(path_1.default.join(templatesPath, 'with-router'));
        }
        if (withLogin) {
            folders.push(path_1.default.join(templatesPath, 'with-login'));
        }
        if (designLibrary === 'antd') {
            folders.push(path_1.default.join(templatesPath, 'with-antd/common'));
            if (withRouter) {
                folders.push(path_1.default.join(templatesPath, 'with-antd/with-router'));
            }
            if (withLogin) {
                folders.push(path_1.default.join(templatesPath, 'with-antd/with-login'));
            }
        }
        return folders;
    };
    utils_1.mergeFolders(getFolders(), destinationPath, options);
    fs_extra_1.default.writeFileSync(path_1.default.join(destinationPath, 'package.json'), utils_1.getFrontendPackage(options));
};
