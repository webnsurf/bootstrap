"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceVariables = (string, variables = {}) => {
    let finalString = string;
    Object.keys(variables).forEach(variable => {
        const variableRegexp = new RegExp(`\\/\\*\\s*{{${variable}}}\\s*\\*\\/|{{${variable}}}`, 'g');
        const variablevalue = variables[variable];
        finalString = finalString.replace(variableRegexp, variablevalue);
    });
    return finalString;
};
