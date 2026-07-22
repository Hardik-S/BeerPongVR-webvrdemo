const fs = require('fs');
const os = require('os');
const path = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(os.tmpdir(), 'beerpongvr-webpack-check');

fs.rmSync(outputPath, { force: true, recursive: true });

const compiler = webpack({
  mode: 'development',
  context: projectRoot,
  entry: './components/waitForAirhorn.js',
  output: {
    path: outputPath,
    filename: 'bundle.js',
  },
});

compiler.run((error, stats) => {
  compiler.close((closeError) => {
    if (error || closeError) {
      console.error(error || closeError);
      process.exit(1);
    }

    if (stats.hasErrors()) {
      console.error(stats.toString({ all: false, errors: true }));
      process.exit(1);
    }

    const bundlePath = path.join(outputPath, 'bundle.js');
    if (!fs.existsSync(bundlePath)) {
      console.error(`Expected webpack bundle at ${bundlePath}`);
      process.exit(1);
    }

    console.log(`Webpack smoke build wrote ${bundlePath}`);
  });
});
