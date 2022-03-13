const { resolve } = require('path'),
      { writeFile } = require('fs/promises');

async function initCliService(project, selectedFrames) {
  const config = require('@hangteam/tr-cli-service/config.json');
  config.project = project;
  config.selectedFrames = selectedFrames;
  await writeFile(resolve(project, 'node_modules/@hangteam/tr-cli-service/config.json'), JSON.stringify(config, null, 2));
}

module.exports = initCliService;

  

