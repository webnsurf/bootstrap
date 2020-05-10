"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const replaceVariables_1 = require("./replaceVariables");
const general_1 = require("./general");
const reusableFiles = general_1.getReusableFiles();
exports.mergeFolders = (foldersToMerge, destinationPath, options) => {
    const traverseTree = (directoryPath, initialDirectory = directoryPath) => {
        general_1.getFiles(directoryPath).forEach(file => {
            const fullPath = path_1.default.join(directoryPath, file);
            const fileStat = fs_extra_1.default.statSync(fullPath);
            const fullDestinationPath = path_1.default.join(destinationPath, directoryPath.replace(initialDirectory, ''), file);
            if (fileStat.isDirectory()) {
                fs_extra_1.default.ensureDirSync(fullDestinationPath);
                return traverseTree(fullPath, initialDirectory);
            }
            const fileContents = fs_extra_1.default.readFileSync(fullPath, 'utf8');
            try {
                const { __template, __variables } = JSON.parse(fileContents);
                if (__template) {
                    const reusableFile = replaceVariables_1.replaceVariables(reusableFiles[__template], __variables);
                    return fs_extra_1.default.writeFileSync(fullDestinationPath, reusableFile, {
                        mode: fileStat.mode,
                    });
                }
            }
            catch (_a) { }
            fs_extra_1.default.writeFileSync(fullDestinationPath, replaceVariables_1.replaceVariables(fileContents, options), { mode: fileStat.mode });
        });
    };
    foldersToMerge.forEach(folder => traverseTree(folder));
};
