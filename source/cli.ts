/* eslint-disable no-console */
import path from 'path';
import { spawn, exec } from 'child_process';

import fs from 'fs-extra';

import { getOptions, printError } from './utils';
import { createFrontend, createBackend, createCommon } from './engine';
import { getReusableFiles } from './engine/utils';
import { replaceVariables } from './engine/utils/replaceVariables';

const reusableFiles = getReusableFiles();

export const cli = async (args: string[]) => {
  try {
    const options = await getOptions(args);

    console.log(`Creating project "${options.projectName}" with the following options:`);
    console.log(options);

    fs.ensureDirSync(options.projectPath);

    if (options.withGit) {
      await new Promise(resolve => {
        fs.writeFileSync(
          path.resolve(options.projectPath, 'README.md'),
          replaceVariables(
            reusableFiles.README,
            { projectName: options.projectName },
          ),
        );

        exec('git init && git add . && git commit -m "Initial commit with README.md" --no-verify', { cwd: options.projectPath }, (err, stdout) => {
          if (err) {
            throw err;
          }

          console.log(stdout);

          resolve();
        });
      });
    }

    if (options.withBackend) {
      createBackend(options, path.join(options.projectPath, 'backend'));
      createFrontend(options, path.join(options.projectPath, 'frontend'));
    } else {
      createFrontend(options, options.projectPath);
    }

    createCommon(options, options.projectPath);

    if (options.withInstall) {
      if (options.withBackend) {
        spawn('npm', ['install'], {
          cwd: path.join(
            options.projectPath,
            'frontend',
          ),
          stdio: 'inherit',
        });
        spawn('npm', ['install'], {
          cwd: path.join(
            options.projectPath,
            'backend',
          ),
          stdio: 'inherit',
        });
      } else {
        spawn('npm', ['install'], {
          cwd: options.projectPath,
          stdio: 'inherit',
        });
      }
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
