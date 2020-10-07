import path from 'path';

import arg from 'arg';
import fs from 'fs-extra';
import inquirer, { QuestionCollection } from 'inquirer';

import { RawArgs, InitialArguments, Options, InitialOptions, ServerOptions, SavedOptions, DomainOptions } from '../types';
import { printError } from './printError';

const sanitizeProjectName = (rawName: string) => (
  rawName.toLowerCase().replace(/\s+/g, '-')
);

const getDomainOptions = (domain = 'webnsurf.com'): DomainOptions => {
  const domainParts = domain.split('.');
  return {
    domain,
    devDomain: [
      ...domainParts.slice(0, domainParts.length - 2),
      'dev',
      ...domainParts.slice(domainParts.length - 2),
    ].join('.'),
  };
};

const savedOptionsPath = path.join(__dirname, 'options.json');

const getInitialArguments = (rawArgs: RawArgs): InitialArguments => {
  const args = arg(
    {
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
    },
    { argv: rawArgs.slice(2) },
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

const prompt = async ({
  projectName,
  skipPrompts,
  setDefaults,
  noBackend,
  noGit,
  noRouter,
  noLogin,
  withDocker,
  withPipeline,
  designLibrary,
  domain,
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
    withRouter: !noRouter || !noLogin,
    withLogin: !noLogin,
    withDocker: !!withDocker || !!withPipeline,
    withPipeline: !!withPipeline,
    designLibrary: designLibrary || null,
    withInstall: !!runInstall,
  };

  const savedOptions: InitialOptions = (() => {
    try { return fs.readJSONSync(savedOptionsPath); } catch { }
  })();

  const domainOptions = getDomainOptions(domain);

  const serverOptions: ServerOptions = {
    serverUsername: serverUsername || '<SERVER_USERNAME>',
    serverIp: serverIp || '<SERVER_IP>',
  };

  if (skipPrompts) {
    return {
      ...initialOptions,
      ...domainOptions,
      ...serverOptions,
      ...savedOptions,
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
  const domainAnswers = await (async () => {
    if (withDocker || initialAnswers.withDocker) {
      if (!domain) {
        const mainDomainAnswer = await inquirer.prompt<DomainOptions>([{
          type: 'input',
          name: 'domain',
          message: 'Enter the domain name to use',
          default: domainOptions.domain,
        }]);

        return getDomainOptions(mainDomainAnswer.domain);
      }
    }

    return domainOptions;
  })();
  const serverAnswers = await (() => {
    const serverQuestions: QuestionCollection[] = [];

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
      return inquirer.prompt<ServerOptions>(serverQuestions);
    }

    return serverOptions;
  })();

  if (initialAnswers.withPipeline) {
    initialAnswers.withDocker = true;
  }

  const options = {
    ...initialOptions,
    ...initialAnswers,
    ...domainAnswers,
    ...serverAnswers,
  };

  if (setDefaults) {
    const defaults: SavedOptions = {
      withBackend: options.withBackend,
      withGit: options.withGit,
      withRouter: options.withRouter,
      withLogin: options.withLogin,
      withDocker: options.withDocker,
      withPipeline: options.withPipeline,
      withInstall: options.withInstall,
      domain: options.domain,
      devDomain: options.devDomain,
      designLibrary: options.designLibrary,
      serverUsername: options.serverUsername,
      serverIp: options.serverIp,
    };

    fs.writeFileSync(savedOptionsPath, JSON.stringify(defaults, null, 2));
  }

  return options;
};

export const getOptions = async (rawArgs: RawArgs): Promise<Options> => {
  const initialArguments = getInitialArguments(rawArgs);
  const options = await prompt(initialArguments);

  return options;
};
