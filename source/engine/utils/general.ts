import path from 'path';

import fs from 'fs-extra';

export const getFiles = (directoryPath: string) => (
  fs.readdirSync(directoryPath)
);

export const getReusableFiles = () => {
  const sourcePath = path.join(__dirname, '../../templates/reusable-files');

  return getFiles(sourcePath).reduce((data, filePath) => ({
    ...data,
    [filePath.replace(/\..+$/, '')]: fs.readFileSync(
      path.join(sourcePath, filePath),
      'utf8',
    ),
  }), {});
};
