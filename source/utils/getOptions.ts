import path from 'path';

import arg from 'arg';
import inquirer, { QuestionCollection } from 'inquirer';

import { RawArgs, InitialArguments, Options, InitialOptions, ServerOptions } from '../types';
import { printError } from './printError';

const sanitizeProjectName = (rawName?: string) => (
  rawName && rawName.toLowerCase().replace(/\s+/g, '-')
);

const getInitialArguments = (rawArgs: RawArgs): InitialArguments => {
  const args = arg(
    {
      '--yes': Boolean,
      '--no-backend': Boolean,
      '--no-git': Boolean,
      '--no-router': Boolean,
      '--no-login': Boolean,
      '--docker': Boolean,
      '--pipeline': Boolean,
      '--install': Boolean,
      '--design': String,
      '--server-user': String,
      '--server-ip': String,
      '-y': '--yes',
      '-d': '--docker',
      '-p': '--pipeline',
      '-i': '--install',
    },
    { argv: rawArgs.slice(2) }
  );

  const designLibrary = (() => {
    const argument = args['--design'];

    if (argument === 'antd') {
      return argument;
    }

    if (argument === 'material') {
      return argument;
    }

    if (argument) {
      printError([`Design library "${argument}" is not supported`]);
    }
  })();

  return {
    projectName: args._[0],
    skipPrompts: args['--yes'] || false,
    noBackend: args['--no-backend'] || false,
    noGit: args['--no-git'] || false,
    noRouter: args['--no-router'] || false,
    noLogin: args['--no-login'] || false,
    withDocker: args['--docker'] || false,
    withPipeline: args['--pipeline'] || false,
    runInstall: args['--install'] || false,
    serverUsername: args['--server-user'],
    serverIp: args['--server-ip'],
    designLibrary,
  };
};

const prompt = async ({
  skipPrompts,
  projectName,
  noBackend,
  noGit,
  noRouter,
  noLogin,
  withDocker,
  withPipeline,
  designLibrary,
  serverUsername,
  serverIp,
  runInstall,
}: InitialArguments = {}): Promise<Options> => {
  const workingDirPath = process.cwd();
  const workingDirArray = workingDirPath.split('/');
  const workingDir = workingDirArray[workingDirArray.length - 1];

  const initialOptions: InitialOptions = {
    projectName: sanitizeProjectName(projectName || workingDir),
    projectPath: projectName ? path.join(workingDirPath, projectName) : workingDirPath,
    withBackend: !noBackend,
    withGit: !noGit,
    withRouter: !noRouter,
    withLogin: !noLogin,
    withDocker: withDocker || withPipeline,
    withPipeline,
    designLibrary: designLibrary || null,
    withInstall: runInstall,
  };

  const serverOptions: ServerOptions = {
    serverUsername: serverUsername || '<SERVER_USERNAME>',
    serverIp: serverIp || '<SERVER_IP>',
  };

  if (skipPrompts) {
    return {
      ...initialOptions,
      ...serverOptions,
    };
  }

  const questions: QuestionCollection[] = [];

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

  const initialAnswers = await inquirer.prompt<InitialOptions>(questions);
  const serverAnswers = await (() => {
    const serverQuestions: QuestionCollection[] = [];

    if (withPipeline || initialAnswers.withPipeline) {
      if (!serverUsername) {
        serverQuestions.push({
          type: 'input',
          name: 'serverUsername',
          message: 'Enter your username on the remote server?',
          default: serverOptions.serverUsername,
        });
      }

      if (!serverIp) {
        serverQuestions.push({
          type: 'input',
          name: 'serverIp',
          message: 'Enter your remote server IP address?',
          default: serverOptions.serverIp,
        });
      }
    }

    if (serverQuestions.length) {
      return inquirer.prompt<ServerOptions>(serverQuestions);
    }

    return serverOptions;
  })();

  return {
    ...initialOptions,
    ...initialAnswers,
    ...serverAnswers,
  };
};

export const getOptions = async (rawArgs: RawArgs): Promise<Options> => {
  const initialArguments = getInitialArguments(rawArgs);
  const options = await prompt(initialArguments);

  return options;
};
