/* eslint-disable no-console */
import path from 'path';

import { getOptions } from './utils';
import { createFrontend, createBackend } from './engine';
import { printError } from './utils/printError';

export const cli = async (args: string[]) => {
  try {
    const options = await getOptions(args);

    console.log(`Creating project "${options.projectName}" with the following options:`);
    console.log(options);

    if (options.withBackend) {
      createBackend(options, path.join(options.projectPath, 'backend'));
      createFrontend(options, path.join(options.projectPath, 'frontend'));
    } else {
      createFrontend(options, options.projectPath);
    }
  } catch (error) {
    if (error.code === 'ARG_UNKNOWN_OPTION') {
      return printError([error.message]);
    }

    printError([
      '  Something went wrong collecting options',
      '  Try to reinstall the package and try again',
      '  You can reinstall the package with the below command:',
      '      npm i -g @webnsurf/project-bootstrap',
    ]);
  }
};
