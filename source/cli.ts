import { getOptions } from './utils';
import { createFrontend, createBackend } from './engine';

export const cli = async (args: string[]) => {
  const options = await getOptions(args);

  createFrontend(options);

  if (options.withBackend) {
    createBackend(options);
  }
};
