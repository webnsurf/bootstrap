/* eslint-disable no-underscore-dangle */
import path from 'path';

import fs from 'fs-extra';

import { Options } from '../../types';
import { replaceVariables } from './replaceVariables';
import { getFiles, getReusableFiles } from './general';

const reusableFiles = getReusableFiles();

export const mergeFolders = (
  foldersToMerge: string[],
  destinationPath: string,
  options: Options,
) => {
  const traverseTree = (directoryPath: string, initialDirectory = directoryPath) => {
    getFiles(directoryPath).forEach(file => {
      const fullPath = path.join(directoryPath, file);
      const fileStat = fs.statSync(fullPath);
      const fullDestinationPath = path.join(
        destinationPath,
        directoryPath.replace(initialDirectory, ''),
        file,
      );

      if (fileStat.isDirectory()) {
        fs.ensureDirSync(fullDestinationPath);

        return traverseTree(fullPath, initialDirectory);
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');

      try {
        const { __template, __variables } = JSON.parse(fileContents);

        if (__template) {
          const reusableFile = replaceVariables(
            reusableFiles[__template],
            __variables,
          );

          return fs.writeFileSync(fullDestinationPath, reusableFile, {
            mode: fileStat.mode,
          });
        }
      } catch {}

      fs.writeFileSync(
        fullDestinationPath,
        replaceVariables(fileContents, options),
        { mode: fileStat.mode },
      );
    });
  };

  foldersToMerge.forEach(folder => traverseTree(folder));
};
