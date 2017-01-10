#!/usr/bin/env node

let colors = require('colors');
let exec = require('child_process').exec;
let pkg = require('../package.json');
let year = new Date().getFullYear();

let preamble = `/*!
 *  RadioRadio ${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) 2016-${year} ${pkg.author.name} (${pkg.author.url})
 *
 *  RadioRadio may be freely distributed under the ${pkg.license} license.
 */
`;

exec(`$(npm bin)/uglifyjs src/radioradio.js --beautify 'indent-level=2' --preamble '${preamble}' --output dist/radioradio.js`);
exec(`$(npm bin)/uglifyjs src/radioradio.js --compress --mangle --preamble '${preamble}' --output dist/radioradio.min.js`);

console.log(colors.green(`RadioRadio ${pkg.version} built successfully!`));
