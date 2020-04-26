#!/usr/bin/env node
/* eslint-disable */
const path = require('path');

const fs = require('fs-extra');
const chokidar = require('chokidar');

const sourcePath = path.join(__dirname, 'source/templates');
const libPath = path.join(__dirname, 'lib/templates');

fs.copySync(sourcePath, libPath);

if (process.argv[2] == '--watch') {
  chokidar.watch(sourcePath).on('change', filePath => {  
    fs.copySync(
      filePath,
      path.join(
        libPath,
        filePath.replace(sourcePath, ''),
      ),
    );
  });
}
