const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;
const commonjs = require('@rollup/plugin-commonjs');
const C = require('../tasks/constants');
const path = require('path');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const generateAtTypesRollup = (options) => ({
  input:{
    input: options.input,
    plugins: [
      dts(),
    ],
    external(id) {
      const isNodeModules = !(/\.+\//.test(id));
      const ignore = options.ignoreNodeModules ? isNodeModules : false;
      if (ignore) {
        console.log(`-- ${id} `);
      } else {
        console.log(`++ ${id} `);
      }
      return ignore;
    },
  },
  output: {
    file: path.resolve(path.dirname(options.input), 'dist', 'main.d.ts'),
    format: 'esm',
  },
});

const generateRollupCJS = (options) => ({
  input: {
    input: options.input,
    plugins: [
      resolve({ extensions }),
      typescript({
        tsconfig: path.resolve(C.PROJECT_ROOT, 'tsconfig.json'),
      }),
      commonjs(),
    ],
    external(id) {
      const isNodeModules = !(/\.+\//.test(id));
      const ignore = options.ignoreNodeModules ? isNodeModules : false;
      if (ignore) {
        console.log(`-- ${id} `);
      } else {
        console.log(`++ ${id} `);
      }
      return ignore;
    },
  },
  output: {
    file: path.resolve(path.dirname(options.input), 'dist', 'main.cjs.js'),
    format: 'cjs',
  }
});

const generateRollupESM = (options)  => ({
  input: {
    input: options.input,
    plugins: [
      resolve({ extensions }),
      typescript({
        tsconfig: path.resolve(C.PROJECT_ROOT, 'tsconfig.json'),
      }),
      commonjs(),
    ],
    external(id) {
      const isNodeModules = !(/\.+\//.test(id));
      const ignore = options.ignoreNodeModules ? isNodeModules : false;
      if (ignore) {
        console.log(`-- ${id} `);
      } else {
        console.log(`++ ${id} `);
      }
      return ignore;
    },
  },
  output: {
    file: path.resolve(path.dirname(options.input), 'dist', 'main.cjs.js'),
    format: 'es',
  }
});

/**
 * @param {string} package - packagesの中のpackagename
 * @param {'esm'|'cjs'|'dts'} type - 出力タイプ
 */
const buildProcess = async (package, type) => {
  const entryFile = path.resolve(C.PROJECT_ROOT, 'packages', package, 'index.ts');
  const rollupConfig = (() => {
    switch(type){
      case 'esm':
        return generateRollupESM({ input: entryFile, ignoreNodeModules: true });
      case 'cjs':
        return generateRollupCJS({ input: entryFile, ignoreNodeModules: true });
      case 'dts':
        return generateAtTypesRollup({ input: entryFile, ignoreNodeModules: true, });
      default:
        throw new Error('not found output')
    }
  })();
  const build = await rollup.rollup(rollupConfig.input);
  return build.write(rollupConfig.output);
}
module.exports = buildProcess;
