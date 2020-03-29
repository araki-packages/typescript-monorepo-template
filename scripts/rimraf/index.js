const C = require('../tasks/constants');
const path = require('path');
const rimraf = require('rimraf');

const removeDir = async (packages) => {
  try {
    await Promise.all(packages.map((package) => {
      return new Promise((resolve, reject) => {
        const PACKAGE_LIB_ROOT = path.resolve(C.PROJECT_ROOT, 'packages', package, 'dist');
        rimraf(PACKAGE_LIB_ROOT, (err) => {
          if (err != null) reject(err);
          resolve('SUCCESS');
        })
      })
    }));
  } catch (e) {
    throw e;
  }
  return 'REMOVE DIR DONE';
};

module.exports = removeDir
