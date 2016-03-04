# RadioRadio

[![npm version](https://badge.fury.io/js/radioradio.svg)](https://badge.fury.io/js/radioradio)
[![Build Status](https://travis-ci.org/jgarber623/RadioRadio.svg?branch=master)](https://travis-ci.org/jgarber623/RadioRadio)
[![Code Climate](https://codeclimate.com/github/jgarber623/RadioRadio/badges/gpa.svg)](https://codeclimate.com/github/jgarber623/RadioRadio)

### Key Features

- Dependency-free
- AMD/CommonJS module support

RadioRadio is also really tiny:

<table>
	<tbody>
		<tr>
			<th>Uncompressed</th>
			<td>1,304 bytes</td>
		</tr>
		<tr>
			<th>Minified</th>
			<td>770 bytes</td>
		</tr>
		<tr>
			<th>Minifed and gzipped</th>
			<td>477 bytes</td>
		</tr>
	</tbody>
</table>


## Getting RadioRadio

Adding RadioRadio to your project is easy! You've got a couple options:

- [Download a tagged version](https://github.com/jgarber623/RadioRadio/tags) from GitHub and do it yourself _(old school)_.
- Install via [Bower](http://bower.io/): `bower install radioradio`
- Install via [npm](https://www.npmjs.com/): `npm install radioradio`


## Usage

TODO


## Browser Support

RadioRadio works in all modern browsers. The library makes use of several new(ish) JavaScript methods, including:

- `Object.keys` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys))
- `Array.prototype.forEach()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))

Internet Explorer added native support for these features in version 9, but if you wish to support older versions of IE, check out the polyfills available on the above linked MDN pages. RouterRouter, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose to polyfill older versions of IE.


## Acknowledgments

RadioRadio is inspired by [Morgan Roderick](https://github.com/mroderick)'s [PubSubJS](https://github.com/mroderick/PubSubJS)

RadioRadio is written and maintained by [Jason Garber](https://sixtwothree.org/).


## License

RadioRadio is freely available under [The MIT License](http://opensource.org/licenses/MIT). Go forth and make the Web a more accessible place.