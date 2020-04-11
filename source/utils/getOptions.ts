import path from 'path';

import arg from 'arg';
import inquirer, { QuestionCollection } from 'inquirer';

import { RawArgs, InitialArguments, Options } from '../types';

const sanitizeProjectName = (rawName?: string) => (
  rawName && rawName.toLowerCase().replace(/\s+/g, '-')
);

const getInitialArguments = (rawArgs: RawArgs): InitialArguments => {
  try {
    const args = arg(
      {
        '--yes': Boolean,
        '--no-backend': Boolean,
        '--no-git': Boolean,
        '--no-router': Boolean,
        '--no-login': Boolean,
        '--no-antd': Boolean,
        '--install': Boolean,
        '-y': '--yes',
        '-b': '--no-backend',
        '-g': '--no-git',
        '-r': '--no-router',
        '-l': '--no-login',
        '-a': '--no-antd',
        '-i': '--install',
      },
      { argv: rawArgs.slice(2) }
    );

    return {
      projectName: args._[0],
      skipPrompts: args['--yes'] || false,
      noBackend: args['--no-backend'] || false,
      noGit: args['--no-git'] || false,
      noRouter: args['--no-router'] || false,
      noLogin: args['--no-login'] || false,
      noAntd: args['--no-antd'] || false,
      runInstall: args['--install'] || false,
    };
  } catch (err) {
    if (err.code === 'ARG_UNKNOWN_OPTION') {
      // eslint-disable-next-line no-console
      console.error(err.message);
    } else {
      throw err;
    }
  }
};

const prompt = async ({
  skipPrompts,
  projectName,
  noBackend,
  noGit,
  noRouter,
  noLogin,
  noAntd,
  runInstall,
}: InitialArguments = {}): Promise<Options> => {
  const workingDirPath = process.cwd();
  const workingDirArray = workingDirPath.split('/');
  const workingDir = workingDirArray[workingDirArray.length - 1];

  const initialOptions: Options = {
    projectName: sanitizeProjectName(projectName || workingDir),
    projectPath: projectName ? path.join(workingDirPath, projectName) : workingDirPath,
    withBackend: !noBackend,
    withGit: !noGit,
    withRouter: !noRouter,
    withLogin: !noLogin,
    withAntd: !noAntd,
    withInstall: runInstall,
  };

  if (skipPrompts) {
    return initialOptions;
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

  if (!noAntd) {
    questions.push({
      type: 'confirm',
      name: 'withAntd',
      message: 'Initialize using Ant Design?',
      default: true,
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

  const answers = await inquirer.prompt<Options>(questions);

  return {
    ...initialOptions,
    ...answers,
  };
};

export const getOptions = async (rawArgs: RawArgs): Promise<Options> => {
  const initialArguments = getInitialArguments(rawArgs);
  const options = await prompt(initialArguments);

  return options;
};
