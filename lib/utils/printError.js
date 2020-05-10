"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.printError = (lines) => {
    console.error('----- ERROR -----');
    lines.forEach(line => console.error(`  ${line}`));
    console.error('-----------------\n');
};
