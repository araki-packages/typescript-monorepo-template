const packageSelect = require('./packageCheck');
const { spawn } = require('child_process');
// const PROCESS = {
//   BUILD: (package) => ['node', 'scripts/tasks/childProcess.js', package].join(' '),
// };

const main = async () => {
  const { packages } = await packageSelect();
  packages.forEach(package => {
    const buildProcess = spawn('node', ['scripts/tasks/childProcess.js', package]);
    buildProcess.stdout.on('data', (chunk) => console.log(chunk.toString()));
  });
};

main();