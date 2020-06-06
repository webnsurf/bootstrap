import { exec } from 'child_process';
import path from 'path';

import fs from 'fs-extra';

import { Options } from '../types';
import { mergeFolders } from './utils';

export const createCommon = (
  options: Options,
  destinationPath: string,
) => {
  const { withBackend, withDocker, withPipeline } = options;
  const templatesPath = path.join(
    __dirname,
    withBackend
      ? '../templates/common/with-backend'
      : '../templates/common/simple',
  );

  fs.ensureDirSync(destinationPath);

  const getFolders = () => {
    const folders = withBackend
      ? [path.join(templatesPath, 'common')]
      : [];

    if (withDocker) {
      folders.push(path.join(templatesPath, 'with-docker'));
    }

    if (withPipeline) {
      folders.push(path.join(templatesPath, 'with-pipeline'));
    }

    return folders;
  };

  mergeFolders(
    getFolders(),
    destinationPath,
    options,
  );

  if (options.withGit) {
    fs.writeFileSync(path.join(destinationPath, '.gitignore'), 'node_modules/\ndist/\n');
  }

  exec('make --version', err => {
    if (err) {
      return fs.unlinkSync(path.resolve(destinationPath, 'Makefile'));
    }
  });
};
