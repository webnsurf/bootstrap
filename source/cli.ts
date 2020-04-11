import { getOptions } from './utils';

export const cli = async (args: string[]) => {
  const options = await getOptions(args);

  // eslint-disable-next-line
  console.log(options);
};
