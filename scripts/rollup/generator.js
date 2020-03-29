const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;
const commonjs = require('@rollup/plugin-commonjs');
const C = require('../tasks/constants');
const path = require('path');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const generateAtTypesRollupInput = (options) => ({
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
});

const generateAtTypesRollupOutput = (options) => ({
  file: path.resolve(options.projectRoot, 'dist', 'main.d.ts'),
  format: 'esm',
});

const generateRollupInput = (options) => ({
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
});

const generateRollupOutputList = (options) => {
  return [
    {
      file: path.resolve(options.projectRoot, 'dist', 'main.cjs.js'),
      format: 'cjs',
    }, {
      file: path.resolve(options.projectRoot, 'dist', 'main.esm.js'),
      format: 'es',
    },
  ];
};

const buildAtTypes = async (packages) => {
  const packageEntries = packages.map((package) => path.resolve(C.PROJECT_ROOT, 'packages', package, 'index.ts'));
  try {
    return await Promise.all(
      packageEntries.map(async (value) => {
        const build = await rollup.rollup(generateAtTypesRollupInput({
          input: value,
          ignoreNodeModules: true
        }));
        const result = await build.write(generateAtTypesRollupOutput({
          projectRoot: path.dirname(value),
        }))
        return result;
      })
    )
  } catch (e) {
    throw e;
  }
};

const buildSource = async (packages) => {
  const packageEntries = packages.map((package) => path.resolve(C.PROJECT_ROOT, 'packages', package, 'index.ts'));
  try {
    return await Promise.all(
      packageEntries.map(async (value) => {
        const build = await rollup.rollup(generateRollupInput({
          input: value,
          ignoreNodeModules: true
        }));
        const outputList = generateRollupOutputList({
          projectRoot: path.dirname(value),
        });
        const result = await Promise.all(
          outputList.map(output => build.write(output))
        );
        return result;
      })
    );
  } catch (err) {
    throw err;
  }
}


const runner = async (packages) => {
  return await Promise.all([
    buildAtTypes(packages),
    buildSource(packages),
  ])
}

module.exports = runner;
