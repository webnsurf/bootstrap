import sortPackage from 'sort-package-json';

import { Options } from '../../../types';
import { replaceVariables } from '../replaceVariables';

const common = {
  'name': '{{projectName}}',
  'private': true,
  'version': '0.0.1',
  'description': '',
  'scripts': {
    'build': 'webpack --config ./config/webpack.prod.config.js',
    'start': 'webpack-dev-server --config ./config/webpack.dev.config.js',
  },
  'author': '',
  'license': '',
  'dependencies': {
    'classnames': '^2.2.6',
    'cookies-js': '^1.2.3',
    'react': '^16.12.0',
    'react-dom': '^16.12.0',
  },
  'devDependencies': {
    '@babel/core': '^7.8.4',
    '@babel/plugin-proposal-class-properties': '^7.8.3',
    '@babel/plugin-proposal-object-rest-spread': '^7.8.3',
    '@babel/plugin-transform-async-to-generator': '^7.8.3',
    '@babel/preset-env': '^7.8.4',
    '@babel/preset-react': '^7.8.3',
    '@babel/preset-typescript': '^7.8.3',
    '@types/classnames': '^2.2.10',
    '@types/react': '^16.9.19',
    '@types/react-dom': '^16.9.5',
    '@typescript-eslint/eslint-plugin': '^2.19.2',
    '@typescript-eslint/parser': '^2.19.2',
    'babel-loader': '^8.0.6',
    'babel-plugin-import': '^1.13.0',
    'baggage-loader': '^1.0.0',
    'copy-webpack-plugin': '^5.1.1',
    'core-js': '^3.6.4',
    'css-loader': '^3.4.2',
    'eslint': '^6.8.0',
    'eslint-config-airbnb': '^18.0.1',
    'eslint-plugin-import': '^2.20.1',
    'eslint-plugin-jsx-a11y': '^6.2.3',
    'eslint-plugin-react': '^7.18.3',
    'eslint-plugin-react-hooks': '^2.3.0',
    'html-webpack-plugin': '^3.2.0',
    'less-loader': '^5.0.0',
    'less': '^3.11.1',
    'mini-css-extract-plugin': '^0.9.0',
    'node-sass': '^4.13.1',
    'react-svg-loader': '^3.0.3',
    'sass-loader': '^8.0.2',
    'source-map-loader': '^0.2.4',
    'style-loader': '^1.1.3',
    'stylelint': '^13.1.0',
    'stylelint-config-recommended-scss': '^4.2.0',
    'stylelint-config-standard': '^20.0.0',
    'stylelint-scss': '^3.14.2',
    'typescript': '^3.7.5',
    'url-loader': '^3.0.0',
    'webpack': '^4.41.6',
    'webpack-bundle-analyzer': '^3.6.1',
    'webpack-cli': '^3.3.11',
    'webpack-dev-server': '^3.10.3',
  },
};

const withRouter = {
  'dependencies': {
    'react-router': '^5.1.2',
    'react-router-dom': '^5.1.2',
  },
  'devDependencies': {
    '@types/react-router-dom': '^5.1.0',
  },
};

const withLogin = {
  'dependencies': {
    ...withRouter.dependencies,
    'axios': '^0.19.0',
    'final-form': '^4.18.6',
    'react-final-form': '^6.3.3',
    'react-redux': '^7.2.0',
    'redux': '^4.0.5',
    'resize-observer-polyfill': '^1.5.1',
    'throttle-debounce': '^2.1.0',
    'validator': '^11.1.0',
  },
  'devDependencies': {
    ...withRouter.devDependencies,
    '@types/jsonwebtoken': '^8.3.5',
    '@types/validator': '^10.11.3',
    '@types/react-redux': '^7.1.7',
    '@types/throttle-debounce': '^2.1.0',
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

const withAntd = {
  'dependencies': {
    'antd': '^4.1.2',
    'resize-observer-polyfill': '^1.5.1',
    'throttle-debounce': '^2.1.0',
  },
  'devDependencies': {
    '@types/throttle-debounce': '^2.1.0',
  },
};

const withDocker = {
  'scripts': {
    'run-dev': 'docker-compose up | sed -En "s/({{projectName}}-dev\\s*\\|\\s*(.*)|(Step| --->|Building|Removing|Creating|Successfully))/\\2\\3/p"',
    'build-dev': 'docker-compose up -d --build && npm run run-dev',
    'clean-dev': 'docker-compose down && docker image rm {{projectName}}-dev || true',
    'run-local': 'export ENVIRONMENT=local && ./docker/start.sh',
    'build-local': 'export ENVIRONMENT=local && ./docker/build.sh && npm run run-local',
    'clean-local': 'docker kill {{projectName}} && docker rm {{projectName}} && docker image rm {{projectName}}:latest || true',
  },
};

export const getFrontendPackage = (options: Options) => {
  let packageObject = { ...common };

  if (options.withRouter) {
    packageObject = {
      ...packageObject,
      dependencies: {
        ...packageObject.dependencies,
        ...withRouter.dependencies,
      },
      devDependencies: {
        ...packageObject.devDependencies,
        ...withRouter.devDependencies,
      },
    };
  }

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

  if (options.designLibrary === 'antd') {
    packageObject = {
      ...packageObject,
      dependencies: {
        ...packageObject.dependencies,
        ...withAntd.dependencies,
      },
      devDependencies: {
        ...packageObject.devDependencies,
        ...withAntd.devDependencies,
      },
    };
  }

  if (options.withDocker && !options.withBackend) {
    packageObject = {
      ...packageObject,
      scripts: {
        ...packageObject.scripts,
        ...withDocker.scripts,
      },
    };
  }

  return replaceVariables(
    sortPackage(JSON.stringify(packageObject, null, 2)),
    options,
  );
};
