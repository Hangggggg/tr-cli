async function install(project, selectedFrames) { 
  const { resolve } = require('path'),
        { essentialPackages, addableFrames } = require('../config.json'),
        dependenciesPackages = [...essentialPackages.dependencies],
        devDependenciesPackages = [...essentialPackages.devDependencies];

  for (const frame of selectedFrames) {
    const dependencies = addableFrames[frame].dependencies,
          devDependencies = addableFrames[frame].devDependencies;
          
    dependencies.length && dependenciesPackages.push(...dependencies);
    devDependencies.length && devDependenciesPackages.push(...dependencies);
  }
  dependenciesPackages.length && await download(dependenciesPackages.join(' '), '', resolve(project));
  devDependenciesPackages.length && await download(devDependenciesPackages.join(' '), '-D', resolve(project));
}

function download(packages, options, cwd) {
  const process = require('process'),
        { spawn } = require('child_process'),
        { usedTool } = require('../config.json');

  return new Promise((resolve, reject) => {
    const childProcess = spawn(usedTool, `${packages} ${options}`, { stdio: 'inherit', shell: true, cwd }); 
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('error', error => reject(error));
    childProcess.on('close', () => resolve());
  })  
}

module.exports = install;

