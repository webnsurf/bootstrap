/* eslint-disable no-console */

export const printError = (lines: string[]) => {
  console.error('----- ERROR -----');
  lines.forEach(line => console.error(`  ${line}`));
  console.error('-----------------\n');
};
