const process = require('process'),
      { resolve } = require('path'),
      { spawn } = require('child_process'),
      { usedTool } = require('../config.json'),
      { essentialPackages, addableFrames } = require('../config.json');

function download(packages, options, cwd) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(usedTool, `${packages} ${options}`, { stdio: 'inherit', shell: true, cwd }); 
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('error', error => reject(error));
    childProcess.on('close', () => resolve());
  })  
}

async function install(project, selectedFrames) { 
  const dependenciesPackages = [...essentialPackages.dependencies],
        devDependenciesPackages = [...essentialPackages.devDependencies];
  for (const frame of selectedFrames) {
    const dependencies = addableFrames[frame].dependencies,
          devDependencies = addableFrames[frame].devDependencies;
    dependencies.length && dependenciesPackages.push(...dependencies);
    devDependencies.length && devDependenciesPackages.push(...dependencies);
  }
  dependenciesPackages.length && await download(dependenciesPackages.join(' '), '', resolve(project));
  devDependenciesPackages.length && await download(devDependenciesPackages.join(' '), '--save-dev', resolve(project));
}

module.exports = install;

