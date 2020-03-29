const C = require('../tasks/constants');
const path = require('path');
const projectRootPackageJson = require(path.resolve(C.PROJECT_ROOT, 'package.json'));

const initialOption = {
  pacakgeName: '',
  dirname: '',
  registry: '',
};
const generatePackageJSON = (options = initialOption) => {
  const registry = options.registry == '' ?
    {} : (
      { "publishConfig": { "registry": options.registry } }
    );
  return {
    "name": options.packageName,
    "version": "1.0.0",
    "main": "dist/index.cjs.js",
    "module": "dist/index.esm.js",
    "types": "dist/index.d.ts",
    "files": [
      "LICENSE",
      "README.md",
      "dist/"
    ],
    ...registry,
    "homepage": projectRootPackageJson.homepage,
    "bugs": projectRootPackageJson.bugs,
    "repository": {
      "type": "git",
      "url": projectRootPackageJson.repository.url,
      "directory": `packages/${options.dirname}`
    },
    "license": "MIT"
  };
};

module.initialOption = initialOption;
module.exports = generatePackageJSON;