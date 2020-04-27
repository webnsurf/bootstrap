import path from 'path';

import fs from 'fs-extra';

import { Options } from '../types';

import { getFrontendPackage, mergeFolders } from './utils';

const templatesPath = path.join(__dirname, '../templates/frontend');

export const createFrontend = (
  options: Options,
  destinationPath: string,
) => {
  const { withGit, withDocker, withRouter, withLogin, designLibrary } = options;
  fs.ensureDirSync(destinationPath);

  const getFolders = () => {
    const folders = [path.join(templatesPath, 'common')];

    if (withGit) {
      folders.push(path.join(templatesPath, 'with-git'));
    }

    if (withDocker) {
      folders.push(path.join(templatesPath, 'with-docker'));
    }

    if (withRouter) {
      folders.push(path.join(templatesPath, 'with-router'));
    }

    if (withLogin) {
      folders.push(path.join(templatesPath, 'with-login'));
    }

    if (designLibrary === 'antd') {
      folders.push(path.join(templatesPath, 'with-antd/common'));

      if (withRouter) {
        folders.push(path.join(templatesPath, 'with-antd/with-router'));
      }

      if (withLogin) {
        folders.push(path.join(templatesPath, 'with-antd/with-login'));
      }
    }

    return folders;
  };

  mergeFolders(
    getFolders(),
    destinationPath,
    options,
  );

  fs.writeFileSync(
    path.join(destinationPath, 'package.json'),
    getFrontendPackage(options),
  );
};
