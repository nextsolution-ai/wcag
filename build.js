const { minify } = require('terser');
const fs = require('fs').promises;
const path = require('path');

async function minifyFile(inputPath, outputPath) {
  try {
    const code = await fs.readFile(inputPath, 'utf8');
    const result = await minify(code, {
      compress: {
        dead_code: true,
        drop_console: false, // Keep console.error for debugging
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    });

    await fs.writeFile(outputPath, result.code);
    console.log(`Minified ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error minifying ${inputPath}:`, error);
  }
}

async function build() {
  try {
    // Create dist directory if it doesn't exist
    await fs.mkdir('dist', { recursive: true });

    // Minify widget files
    await minifyFile('widget-deploy.js', 'dist/widget-deploy.min.js');
    await minifyFile('widget-client.js', 'dist/widget-client.min.js');

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build(); 