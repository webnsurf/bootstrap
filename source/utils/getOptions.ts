import arg from 'arg';
import inquirer, { QuestionCollection } from 'inquirer';

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

const prompt = async (options: InitialArguments = {}): Promise<Options> => {
  const initialOptions: Options = {
    withBackend: !options.noBackend,
    withGit: !options.noGit,
    withRouter: !options.noRouter,
    withLogin: !options.noLogin,
    withAntd: !options.noAntd,
    withInstall: options.runInstall,
  };

  if (options.skipPrompts) {
    return initialOptions;
  }

  const questions: QuestionCollection[] = [];

  if (!options.noBackend) {
    questions.push({
      type: 'confirm',
      name: 'withBackend',
      message: 'Initialize a backend server?',
      default: true,
    });
  }

  if (!options.noGit) {
    questions.push({
      type: 'confirm',
      name: 'withGit',
      message: 'Initialize a git repository?',
      default: true,
    });
  }

  if (!options.noRouter) {
    questions.push({
      type: 'confirm',
      name: 'withRouter',
      message: 'Initialize with React Router?',
      default: true,
    });
  }

  if (!options.noLogin) {
    questions.push({
      type: 'confirm',
      name: 'withLogin',
      message: 'Initialize with Login functionality?',
      default: true,
    });
  }

  if (!options.noAntd) {
    questions.push({
      type: 'confirm',
      name: 'withAntd',
      message: 'Initialize using Ant Design?',
      default: true,
    });
  }

  if (!options.runInstall) {
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

type RawArgs = string[];

interface InitialArguments {
  skipPrompts?: boolean;
  noBackend?: boolean;
  noGit?: boolean;
  noRouter?: boolean;
  noLogin?: boolean;
  noAntd?: boolean;
  runInstall?: boolean;
}

interface Options {
  withBackend: boolean;
  withGit: boolean;
  withRouter: boolean;
  withLogin: boolean;
  withAntd: boolean;
  withInstall: boolean;
}
