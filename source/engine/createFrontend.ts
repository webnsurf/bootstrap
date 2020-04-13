import path from 'path';

import fs from 'fs-extra';

import { Options } from '../types';

import { getFrontendPackage, mergeFolders } from './utils';

const templatesPath = path.join(__dirname, '../templates/frontend');

export const createFrontend = (
  { projectName, withGit, withDocker, withRouter, withBackend, withLogin, designLibrary }: Options,
  destinationPath: string,
) => {
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
      } else {
        folders.push(path.join(templatesPath, 'with-antd/simple'));
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
    { projectName },
  );

  fs.writeFileSync(
    path.join(destinationPath, 'package.json'),
    getFrontendPackage(
      { designLibrary, withBackend, withDocker, withGit, withLogin, withRouter },
      { projectName },
    ),
  );
};
