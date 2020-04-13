#!/usr/bin/env node
/* eslint-disable */
const path = require('path');

const fs = require('fs-extra');
const chokidar = require('chokidar');

const sourcePath = path.join(__dirname, 'source/templates');
const distPath = path.join(__dirname, 'dist/templates');

fs.copySync(sourcePath, distPath);

chokidar.watch(sourcePath).on('change', filePath => {  
  fs.copySync(
    filePath,
    path.join(
      distPath,
      filePath.replace(sourcePath, ''),
    ),
  );
});
