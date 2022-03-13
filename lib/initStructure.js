
const { writeFile, mkdir, copyFile } = require('fs/promises'),
      { resolve } = require('path');

function createDirectory(rootDirectory) {
  return mkdir(rootDirectory);
}

function createPackageJson(rootDirectory, sources) {
  const config = require('./template/package.model.json');
  return writeFile(resolve(rootDirectory, 'package.json'), JSON.stringify(Object.assign(config, sources), null, 2));
}

async function initStructure(rootDirectory) {
  await createDirectory(rootDirectory);
  await createDirectory(resolve(rootDirectory, 'public'));
  await createPackageJson(rootDirectory, { name: rootDirectory });
  await copyFile(resolve(__dirname, 'template/index.model.jsx'), resolve(rootDirectory, 'index.jsx'));
}

module.exports = initStructure;
