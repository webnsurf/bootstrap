import sortPackage from 'sort-package-json';

import { Options, Variables } from '../../../types';
import { replaceVariables } from '../replaceVariables';

const common = {
  'name': '{{projectName}}',
  'version': '0.0.1',
  'private': true,
  'keywords': [],
  'license': 'ISC',
  'author': '',
  'main': 'dist/index.js',
  'scripts': {
    'build': 'tsc -p .',
    'start': 'node dist/index.js',
    'start:dev': 'tsnd source/index.ts',
  },
  'dependencies': {
    'cookie-parser': '^1.4.4',
    'express': '^4.17.1',
  },
  'devDependencies': {
    '@types/cookie-parser': '^1.4.2',
    '@types/express': '^4.17.1',
    '@typescript-eslint/eslint-plugin': '^2.19.2',
    '@typescript-eslint/parser': '^2.19.2',
    'eslint': '^6.8.0',
    'eslint-config-airbnb-base': '^14.1.0',
    'eslint-plugin-import': '^2.20.1',
    'ts-node-dev': '^1.0.0-pre.44',
    'typescript': '^3.7.5',
  },
};

const withLogin = {
  'dependencies': {
    'jsonwebtoken': '^8.5.1',
    'validator': '^11.1.0',
  },
  'devDependencies': {
    '@types/jsonwebtoken': '^8.3.5',
    '@types/validator': '^10.11.3',
  },
};

const withGit = {
  'scripts': {
    'precommit': 'lint-staged',
  },
  'husky': {
    'hooks': {
      'pre-commit': 'lint-staged',
    },
  },
  'lint-staged': {
    '*.{ts,tsx}': 'eslint',
  },
  'devDependencies': {
    'husky': '^4.2.3',
    'lint-staged': '^10.0.7',
  },
};

export const getBackendPackage = (
  options: Pick<Options, 'withLogin' | 'withGit'>,
  variables: Variables,
) => {
  let packageObject = { ...common };

  if (options.withLogin) {
    packageObject = {
      ...packageObject,
      dependencies: {
        ...packageObject.dependencies,
        ...withLogin.dependencies,
      },
      devDependencies: {
        ...packageObject.devDependencies,
        ...withLogin.devDependencies,
      },
    };
  }

  if (options.withGit) {
    packageObject = {
      ...packageObject,
      ...withGit,
      scripts: {
        ...packageObject.scripts,
        ...withGit.scripts,
      },
      devDependencies: {
        ...packageObject.devDependencies,
        ...withGit.devDependencies,
      },
    };
  }

  return replaceVariables(
    sortPackage(
      JSON.stringify(packageObject, null, 2),
    ),
    variables,
  );
};
