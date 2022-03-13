const inquirer = require('inquirer'),
      { addableFrames } = require('../config.json');

function SelectFrames() {
  return inquirer.prompt([{ 
    name: 'selectedFrames', 
    message: 'addableFrames',
    type: 'checkbox',
    choices: Object.keys(addableFrames)
  }])
}

module.exports = {
  SelectFrames
} 


