const fs = require('fs');
const os = require('os');
const path = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '..');
const airhornComponentPath = path.join(projectRoot, 'components', 'waitForAirhorn.js');
const indexPath = path.join(projectRoot, 'index.html');
const outputPath = path.join(os.tmpdir(), 'beerpongvr-webpack-check');

fs.rmSync(outputPath, { force: true, recursive: true });

function isRemoteOrFragment(reference) {
  return reference.includes('://') || reference.startsWith('//') || reference.startsWith('#');
}

function normalizeAssetReference(reference) {
  const aframeUrlMatch = /^src:\s*url\(([^)]+)\)$/i.exec(reference.trim());
  return aframeUrlMatch ? aframeUrlMatch[1].trim() : reference;
}

function hasExactRelativePath(relativePath) {
  let currentPath = projectRoot;
  for (const segment of relativePath.split('/')) {
    if (!segment) {
      return false;
    }

    const names = fs.readdirSync(currentPath);
    if (!names.includes(segment)) {
      return false;
    }

    currentPath = path.join(currentPath, segment);
  }
  return true;
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const localReferences = Array.from(indexHtml.matchAll(/\b(?:src|href)="([^"]+)"/g))
  .map((match) => normalizeAssetReference(match[1]))
  .filter((reference) => reference && !isRemoteOrFragment(reference));

const missingReferences = localReferences.filter((reference) => !hasExactRelativePath(reference));
if (missingReferences.length > 0) {
  console.error(`index.html references missing local files: ${missingReferences.join(', ')}`);
  process.exit(1);
}

const airhornComponent = fs.readFileSync(airhornComponentPath, 'utf8');
if (/\bconsole\.log\s*\(/.test(airhornComponent)) {
  console.error('waitForAirhorn.js should not emit debug console logs during play.');
  process.exit(1);
}

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
