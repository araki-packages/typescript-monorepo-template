const packageSelect = require('./packageCheck');
const { exec } = require('child_process');

function npm(...args) {
    return exec(['yarn', ...args].join(' '), (error, stdout, stderror) => {
      console.log(error || stdout || stderror);
    });
}

const main = async () => {
  const { packages } = await packageSelect();
  for (let i = 0; i < packages.length; i++) {
    npm('build:select', packages[i]);
  }
};

main();