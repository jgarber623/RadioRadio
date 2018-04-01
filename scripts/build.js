#!/usr/bin/env node

const colors = require('colors');
const exec = require('child_process').exec;
const pkg = require('../package.json');

const basename = 'radioradio'
const packageName = 'RadioRadio';
const releaseYear = 2016;

const preamble = `/*!
 *  ${packageName} ${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) ${releaseYear}-present ${pkg.author.name} (${pkg.author.url})
 *
 *  ${packageName} may be freely distributed under the ${pkg.license} license.
 */
`;

exec(`$(npm bin)/uglifyjs src/${basename}.js --beautify 'indent-level=2' --preamble '${preamble}' --output dist/${basename}.js`);
exec(`$(npm bin)/uglifyjs src/${basename}.js --compress --mangle --preamble '${preamble}' --output dist/${basename}.min.js`);

console.log(colors.green(`${packageName} ${pkg.version} built successfully!`));
