const inquirer = require('inquirer');
const C = require('./constants');
module.exports = () => {
  return inquirer.prompt([ {
      type: 'checkbox',
      message: 'your are select build packages',
      name: 'packages',
      choices: [
        new inquirer.Separator(' = The Meats = '),
        ...C.PACKAGES.map((val) => ({name: val})),
      ],
      validate: (answer) => {
        if (answer.length < 1) {
            return 'You must check packages';
        }
        return true;
      }
    }
  ]);
};