import { Variables } from '../../types';

export const replaceVariables = (
  string: string,
  variables: Variables,
) => {
  let finalString = string;

  Object.keys(variables).forEach(variable => {
    const variableRegexp = new RegExp(`{{${variable}}}`, 'g');
    const variablevalue = variables[variable];

    finalString = finalString.replace(
      variableRegexp,
      variablevalue,
    );
  });

  return finalString;
};
