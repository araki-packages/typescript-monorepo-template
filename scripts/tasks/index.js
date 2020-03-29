const removeDir = require('../rimraf/index');
const buildTask = require('../rollup/generator');
const C = require('./constants');

const packages = C.PACKAGES;
const main = async () => {
  try {
    await removeDir(packages);
    console.log('REMOVE DIR PROCESS SUCCESS')
    await buildTask(packages);
    console.log('BUILD PROCESS SUCCESS');
  } catch (e) {
    throw e;
  }
}
main()
  .then(() => {
    console.log('ALL TASK SUCCESS');
  })
  .catch((err) => {
    throw err;
  });