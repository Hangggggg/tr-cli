module.exports = async function (project, selectedFrames) {
  const { resolve } = require('path'),
        { writeFile } = require('fs/promises'),
        config = require('@hangteam/tr-cli-service/config.json');

  config.initialization = true;
  config.project = project;
  config.selectedFrames = selectedFrames;
  await writeFile(resolve(project, 'node_modules/@hangteam/tr-cli-service/config.json'), JSON.stringify(config, null, 2));
}

  

