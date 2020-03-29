const rollup = require('rollup');
// const commonjs = require('rollup-plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
// const babel = require('rollup-plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const DEVICE = require('./device');
const path = require('path');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const generateRollupConfig = (options) => ({
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
      console.log(chalk.bgRed(`-- ${id} `));
    }else {
      console.log(chalk.bgCyan(`++ ${id} `));
    }
    return ignore;
  },
  output: [{
    file: 'dist/main.cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/main.es.js',
    format: 'es',
  }]
});

const build = (config) => {
  // TODO 
  // outputoptions ref->  https://rollupjs.org/guide/en/#outputoptions-object
  rollup.rollup(config)
    .then((value) => {
      console.log('success');
      console.log(value);
      value.write();
    })
    .catch((err) => {
      console.log('fail');
      throw err;
    });
};

(() => {
  
  const packageEntries = DEVICE.PACKAGES.map((package) =>  path.resolve(DEVICE.PROJECT_ROOT, 'packages', package, 'index.ts'));
  console.log(packageEntries);
  packageEntries.forEach((value) => {
    build(generateRollupConfig({
      input: value,
      ignoreNodeModules: true
    }));
  })
  

  
})();