const rollup = require('rollup');
// const commonjs = require('rollup-plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
// const babel = require('rollup-plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const DEVICE = require('./device');
const path = require('path');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const generateRollupInput = (options) => ({
  input: options.input,
  plugins: [
    resolve({ extensions }),
    typescript({
      tsconfig: path.resolve(DEVICE.PROJECT_ROOT, 'tsconfig.json'),
    }),
    //commonjs(),
    // babel({ extensions, include: [pkg.buildSettings.include]}),
  ],
  external(id) {
    const isNodeModules = !(/\.+\//.test(id));
    const ignore = options.ignoreNodeModules ? isNodeModules : false;
    if (ignore) {
      console.log(`-- ${id} `);
    }else {
      console.log(`++ ${id} `);
    }
    return ignore;
  },
});

const generateRollupOutputList = (options) => {
  return [{
    file: path.resolve(options.projectRoot, 'dist', 'main.cjs.js'),
    format: 'cjs'
  }, {
    file: path.resolve(options.projectRoot, 'dist', 'main.esm.js'),
    format: 'es',
  }];
};

(() => {
  
  const packageEntries = DEVICE.PACKAGES.map((package) =>  path.resolve(DEVICE.PROJECT_ROOT, 'packages', package, 'index.ts'));
  packageEntries.forEach(async (value) => {
    try{
      const build = await rollup.rollup(generateRollupInput({
        input: value,
        ignoreNodeModules: true
      }));
      generateRollupOutputList({
        projectRoot: path.dirname(value),
      })
        .forEach((output) => {
          build.write(output);
        });
    } catch (err) {
      throw err;
    }
  })
})();