const removeDir = require('../rimraf/index');
const buildTask = require('../rollup/generator');

const main = async (...args) => {
  const package = args[2];
  await removeDir([package]);
  await Promise.all([
     buildTask(package, 'cjs'),
     buildTask(package, 'esm'),
     buildTask(package, 'dts'),
  ]);
};
main(...process.argv);