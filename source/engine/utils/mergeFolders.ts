import path from 'path';

import fs from 'fs-extra';

import { Variables } from '../../types';
import { replaceVariables } from './replaceVariables';

const getFiles = (directoryPath: string) => (
  fs.readdirSync(directoryPath)
);

export const mergeFolders = (
  foldersToMerge: string[],
  destinationPath: string,
  variables: Variables,
) => {
  const traverseTree = (directoryPath: string, initialDirectory = directoryPath) => {
    getFiles(directoryPath).forEach(file => {
      const fullPath = path.join(directoryPath, file);
      const fullDestinationPath = path.join(
        destinationPath,
        directoryPath.replace(initialDirectory, ''),
        file,
      );

      if (fs.statSync(fullPath).isDirectory()) {
        fs.ensureDirSync(fullDestinationPath);

        return traverseTree(fullPath, initialDirectory);
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');

      fs.writeFileSync(
        fullDestinationPath,
        replaceVariables(fileContents, variables),
      );
    });
  };

  foldersToMerge.forEach(folder => traverseTree(folder));
};
