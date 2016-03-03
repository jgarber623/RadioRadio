#!/usr/bin/env node

var colors = require('colors'),
	exec = require('child_process').exec,
	pkg = require('../package.json'),
	preamble = '/*!\n' +
		' *  RadioRadio ' + pkg.version + '\n' +
		' *\n' +
		' *  ' + pkg.description + '\n' +
		' *\n' +
		' *  Source code available at: ' + pkg.homepage + '\n' +
		' *\n' +
		' *  (c) 2015-present ' + pkg.author.name + ' (' + pkg.author.url + ')\n' +
		' *\n' +
		' *  RadioRadio may be freely distributed under the ' + pkg.license + ' license.\n' +
		' */\n';

exec('$(npm bin)/uglifyjs src/radioradio.js --beautify "indent-level=2" --preamble "' + preamble + '" --output dist/radioradio.js');
exec('$(npm bin)/uglifyjs src/radioradio.js --compress --mangle --preamble "' + preamble + '" --output dist/radioradio.min.js');

console.log(colors.green('RadioRadio %s built successfully!'), pkg.version);