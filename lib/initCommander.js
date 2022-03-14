const { program } = require('commander');

function initCommander() {
  program.version(require('../package.json').version);
  addCreateCommand(program);
  addSwitchOriginCommand(program);
  program.parse(require('process').argv);
}

function addCreateCommand() {
  program
    .command('create <project>')
    .description('create a Tr project')
    .action(async (project) => { 
      const { selectedFrames } = await require('./prompt.js').SelectFrames();
      await require('./initStructure.js')(project);
      await require('./install.js')(project, selectedFrames);
      await require('./initCliService.js')(project, selectedFrames);
    });
}

function addSwitchOriginCommand() {
  program
    .option('-t, --tool [tool]')
    .description('switch tool')
    .action(({ tool }) => { // 如果没有 [tool] ，tool 为 true ；否则，tool 为 string 
      const config = require('../config.json');
      if (tool === true) { // 没有提供 tool
        console.log(`usedTool: ${config.usedTool}`);
      } else if (tool === config.usedTool) { // tool === usedTool
        console.log(tool + ' has been used');
      } else if (config.optionalTools.includes(tool)) { // 修改 usedTool
        config.usedTool = tool;
        require('fs/promises')
          .writeFile(require('path').resolve(__dirname, '../config.json'), JSON.stringify(config, null, 2))
          .then(() => console.log(tool + ' has been used'));
      } else { // tool 不可用
        console.error(tool + ' is not available');
      }
    })
}

module.exports = initCommander;
