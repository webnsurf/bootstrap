import path from 'path';

import fs from 'fs-extra';

import { Options } from '../types';

import { getBackendPackage, mergeFolders } from './utils';

const templatesPath = path.join(__dirname, '../templates/backend');

export const createBackend = (
  options: Options,
  destinationPath: string,
) => {
  const { withLogin, withGit, withDocker } = options;
  const getFolders = () => {
    const folders = [path.join(templatesPath, 'common')];

    if (withGit) {
      folders.push(path.join(templatesPath, 'with-git'));
    }

    if (withDocker) {
      folders.push(path.join(templatesPath, 'with-docker'));
    }

    if (withLogin) {
      folders.push(path.join(templatesPath, 'with-login'));
    }

    return folders;
  };

  fs.ensureDirSync(destinationPath);

  mergeFolders(
    getFolders(),
    destinationPath,
    options,
  );

  fs.writeFileSync(
    path.join(destinationPath, 'package.json'),
    getBackendPackage(options),
  );
};
