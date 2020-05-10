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
/* eslint-disable no-console */
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("./utils");
const engine_1 = require("./engine");
const utils_2 = require("./engine/utils");
const replaceVariables_1 = require("./engine/utils/replaceVariables");
const reusableFiles = utils_2.getReusableFiles();
exports.cli = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = yield utils_1.getOptions(args);
        console.log(`Creating project "${options.projectName}" with the following options:`);
        console.log(options);
        fs_extra_1.default.ensureDirSync(options.projectPath);
        if (options.withGit) {
            yield new Promise(resolve => {
                fs_extra_1.default.writeFileSync(path_1.default.resolve(options.projectPath, 'README.md'), replaceVariables_1.replaceVariables(reusableFiles.README, { projectName: options.projectName }));
                child_process_1.exec('git init && git add . && git commit -m "Initial commit with README.md" --no-verify', { cwd: options.projectPath }, (err, stdout) => {
                    if (err) {
                        throw err;
                    }
                    console.log(stdout);
                    resolve();
                });
            });
        }
        if (options.withBackend) {
            engine_1.createBackend(options, path_1.default.join(options.projectPath, 'backend'));
            engine_1.createFrontend(options, path_1.default.join(options.projectPath, 'frontend'));
        }
        else {
            engine_1.createFrontend(options, options.projectPath);
        }
        engine_1.createCommon(options, options.projectPath);
        if (options.withInstall) {
            if (options.withBackend) {
                child_process_1.spawn('npm', ['install'], {
                    cwd: path_1.default.join(options.projectPath, 'frontend'),
                    stdio: 'inherit',
                });
                child_process_1.spawn('npm', ['install'], {
                    cwd: path_1.default.join(options.projectPath, 'backend'),
                    stdio: 'inherit',
                });
            }
            else {
                child_process_1.spawn('npm', ['install'], {
                    cwd: options.projectPath,
                    stdio: 'inherit',
                });
            }
        }
    }
    catch (error) {
        if (error.code === 'ARG_UNKNOWN_OPTION') {
            return utils_1.printError([error.message]);
        }
        utils_1.printError([
            'Something went wrong collecting options',
            'Try to reinstall the package and try again',
            'You can reinstall the package with the below command:',
            '    npm i -g @webnsurf/project-bootstrap',
        ]);
        console.error(error);
    }
});
