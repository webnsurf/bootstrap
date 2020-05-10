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
const path_1 = __importDefault(require("path"));
const arg_1 = __importDefault(require("arg"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const inquirer_1 = __importDefault(require("inquirer"));
const printError_1 = require("./printError");
const sanitizeProjectName = (rawName) => (rawName.toLowerCase().replace(/\s+/g, '-'));
const savedOptionsPath = path_1.default.join(__dirname, 'options.json');
const getInitialArguments = (rawArgs) => {
    const args = arg_1.default({
        '--yes': Boolean,
        '--set-defaults': Boolean,
        '--no-backend': Boolean,
        '--no-git': Boolean,
        '--no-router': Boolean,
        '--no-login': Boolean,
        '--docker': Boolean,
        '--pipeline': Boolean,
        '--install': Boolean,
        '--design': String,
        '--domain': String,
        '--server-user': String,
        '--server-ip': String,
        '-y': '--yes',
        '-s': '--set-defaults',
        '-d': '--docker',
        '-p': '--pipeline',
        '-i': '--install',
    }, { argv: rawArgs.slice(2) });
    const designLibrary = (() => {
        const argument = args['--design'];
        if (argument === 'antd') {
            return argument;
        }
        if (argument === 'material') {
            return argument;
        }
        if (argument) {
            printError_1.printError([`Design library "${argument}" is not supported`]);
        }
    })();
    return {
        projectName: args._[0],
        skipPrompts: args['--yes'] || false,
        setDefaults: args['--set-defaults'] || false,
        noBackend: args['--no-backend'] || false,
        noGit: args['--no-git'] || false,
        noRouter: args['--no-router'] || false,
        noLogin: args['--no-login'] || false,
        withDocker: args['--docker'] || false,
        withPipeline: args['--pipeline'] || false,
        runInstall: args['--install'] || false,
        domain: args['--domain'],
        serverUsername: args['--server-user'],
        serverIp: args['--server-ip'],
        designLibrary,
    };
};
const prompt = ({ projectName, skipPrompts, setDefaults, noBackend, noGit, noRouter, noLogin, withDocker, withPipeline, designLibrary, domain, serverUsername, serverIp, runInstall, } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const workingDirPath = process.cwd();
    const workingDirArray = workingDirPath.split('/');
    const workingDir = workingDirArray[workingDirArray.length - 1];
    const initialOptions = {
        projectName: sanitizeProjectName(projectName || workingDir),
        projectPath: projectName ? path_1.default.join(workingDirPath, projectName) : workingDirPath,
        withBackend: !noBackend,
        withGit: !noGit,
        withRouter: !noRouter || !noLogin,
        withLogin: !noLogin,
        withDocker: !!withDocker || !!withPipeline,
        withPipeline: !!withPipeline,
        designLibrary: designLibrary || null,
        withInstall: !!runInstall,
    };
    const savedOptions = (() => {
        try {
            return fs_extra_1.default.readJSONSync(savedOptionsPath);
        }
        catch (_a) { }
    })();
    const domainOptions = {
        domain: domain || 'webnsurf.com',
    };
    const serverOptions = {
        serverUsername: serverUsername || '<SERVER_USERNAME>',
        serverIp: serverIp || '<SERVER_IP>',
    };
    if (skipPrompts) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, initialOptions), domainOptions), serverOptions), savedOptions);
    }
    const questions = [];
    if (!noBackend) {
        questions.push({
            type: 'confirm',
            name: 'withBackend',
            message: 'Initialize a backend server?',
            default: true,
        });
    }
    if (!noGit) {
        questions.push({
            type: 'confirm',
            name: 'withGit',
            message: 'Initialize a git repository?',
            default: true,
        });
    }
    if (!noRouter) {
        questions.push({
            type: 'confirm',
            name: 'withRouter',
            message: 'Initialize with React Router?',
            default: true,
        });
    }
    if (!noLogin) {
        questions.push({
            type: 'confirm',
            name: 'withLogin',
            message: 'Initialize with Login functionality?',
            default: true,
        });
    }
    if (!designLibrary) {
        questions.push({
            type: 'list',
            name: 'designLibrary',
            message: 'Which design library would you like to use?',
            choices: [
                {
                    name: 'None',
                    checked: true,
                    value: null,
                },
                {
                    name: 'Ant Design',
                    value: 'antd',
                },
                {
                    name: 'Material UI (WIP)',
                    value: 'material',
                    disabled: true,
                },
            ],
        });
    }
    if (!withDocker) {
        questions.push({
            type: 'confirm',
            name: 'withDocker',
            message: 'Initialize with a Docker setup?',
            default: false,
        });
    }
    if (!withPipeline) {
        questions.push({
            type: 'confirm',
            name: 'withPipeline',
            message: 'Initialize with a Jenkins pipeline?',
            default: false,
        });
    }
    if (!runInstall) {
        questions.push({
            type: 'confirm',
            name: 'withInstall',
            message: 'Install node modules after initialisng?',
            default: false,
        });
    }
    const initialAnswers = yield inquirer_1.default.prompt(questions);
    const domainAnswers = yield (() => {
        if (withDocker || initialAnswers.withDocker) {
            if (!domain) {
                return inquirer_1.default.prompt([{
                        type: 'input',
                        name: 'domain',
                        message: 'Enter the domain name to use',
                        default: domainOptions.domain,
                    }]);
            }
        }
        return domainOptions;
    })();
    const serverAnswers = yield (() => {
        const serverQuestions = [];
        if (withPipeline || initialAnswers.withPipeline) {
            if (!serverUsername) {
                serverQuestions.push({
                    type: 'input',
                    name: 'serverUsername',
                    message: 'Enter your username on the remote server',
                    default: serverOptions.serverUsername,
                });
            }
            if (!serverIp) {
                serverQuestions.push({
                    type: 'input',
                    name: 'serverIp',
                    message: 'Enter your remote server IP address',
                    default: serverOptions.serverIp,
                });
            }
        }
        if (serverQuestions.length) {
            return inquirer_1.default.prompt(serverQuestions);
        }
        return serverOptions;
    })();
    if (initialAnswers.withPipeline) {
        initialAnswers.withDocker = true;
    }
    const options = Object.assign(Object.assign(Object.assign(Object.assign({}, initialOptions), initialAnswers), domainAnswers), serverAnswers);
    if (setDefaults) {
        const defaults = {
            withBackend: options.withBackend,
            withGit: options.withGit,
            withRouter: options.withRouter,
            withLogin: options.withLogin,
            withDocker: options.withDocker,
            withPipeline: options.withPipeline,
            withInstall: options.withInstall,
            domain: options.domain,
            designLibrary: options.designLibrary,
            serverUsername: options.serverUsername,
            serverIp: options.serverIp,
        };
        fs_extra_1.default.writeFileSync(savedOptionsPath, JSON.stringify(defaults, null, 2));
    }
    return options;
});
exports.getOptions = (rawArgs) => __awaiter(void 0, void 0, void 0, function* () {
    const initialArguments = getInitialArguments(rawArgs);
    const options = yield prompt(initialArguments);
    return options;
});
