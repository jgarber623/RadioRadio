# RadioRadio

[![npm version](https://badge.fury.io/js/radioradio.svg)](https://badge.fury.io/js/radioradio)
[![Build Status](https://travis-ci.org/jgarber623/RadioRadio.svg?branch=master)](https://travis-ci.org/jgarber623/RadioRadio)
[![Code Climate](https://codeclimate.com/github/jgarber623/RadioRadio/badges/gpa.svg)](https://codeclimate.com/github/jgarber623/RadioRadio)

RadioRadio is a very basic, lightweight, dependency-free JavaScript [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.

### Key Features

- Supports namespaced events (e.g. `foo.bar`)
- Dependency-free
- AMD/CommonJS module support

RadioRadio is also really tiny:

<table>
	<tbody>
		<tr>
			<th>Uncompressed</th>
			<td>1,651 bytes</td>
		</tr>
		<tr>
			<th>Minified</th>
			<td>910 bytes</td>
		</tr>
		<tr>
			<th>Minified and gzipped</th>
			<td>543 bytes</td>
		</tr>
	</tbody>
</table>


## Getting RadioRadio

Adding RadioRadio to your project is easy! You've got a couple options:

- [Download a tagged version](https://github.com/jgarber623/RadioRadio/tags) from GitHub and do it yourself _(old school)_.
- Install via [Bower](http://bower.io/): `bower install radioradio`
- Install via [npm](https://www.npmjs.com/): `npm install radioradio`


## Usage

### Subscribing

```js
RadioRadio.subscribe(topic, subscriber);
```

- **Accepts:** `topic` (String) and `subscriber` (Function)
- **Returns:** String or `false`

#### The `topic` argument

Topics must be strings of any length (e.g. `foo`) made up of letters, numbers, and underscores. Topics may also be organized into namespaces using a `.` as a separator (e.g. `foo.bar`).

Topics within a namespace may themselves act as namespaces. For example, a subscribed topic `foo.bar.biz` exists in the `foo` _and_ `foo.bar` namespaces. Note that this structure will affect publication (see [Publishing](#publishing) below).

Wildcard topics within a namespace (e.g. `foo.*`, `foo.bar.*`) are also allowed. See [Publishing](#publishing) below for more on when these topics are published.

#### The `subscriber` argument

A function to execute when `topic` is published. Subscribers accept a single argument (`data`) passed on from the `publish` method.

### Publishing

```js
RadioRadio.publish(topic, data);
```

- **Accepts:** `topic` (String) and `data` (Object)
- **Returns:** Array or `false`

#### The `topic` argument

The topic to which you wish to publish. When using namespaced topics (e.g. `foo.bar`), you may publish to a single topic:

```js
RadioRadio.publish('foo.bar', data);
```

…or, to a topic and any topics within its namespace:

```js
RadioRadio.publish('foo', data);
```

Publishing to the namespace `foo` will publish to `foo` and _all_ topics namespaced to `foo` (e.g. `foo.bar`, `foo.biz`, `foo.baz`). As mentioned above in [Subscribing](#subscribing), topics may be deeply nested (e.g. `foo.bar.biz`) which will affect publishing to namespaces:

```js
RadioRadio.publish('foo', data);     // publishes to `foo`, `foo.bar`, `foo.bar.biz`
RadioRadio.publish('foo.bar', data); // publishes to `foo.bar`, `foo.bar.biz`
```

Wildcard topics within a namespace (e.g. `foo.*`) will be published alongside adjacent (e.g. `foo.bar`, `foo.biz`) published topics:

```js
RadioRadio.subscribe('foo.bar', subscriber);
RadioRadio.subscribe('foo.*', wildcardSubscriber);

RadioRadio.publish('foo.bar', data); // publishes to `foo.bar` and `foo.*`
```

Note that topics are published in the order in which they were originally subscribed.

#### The `data` argument

The data to pass along to subscribers. Most usefully an Object, `data` _could_ be anything so long as the topic's subscriber functions are prepared to handle it.

### Unsubscribing

```js
RadioRadio.unsubscribe(topic);
```

- **Accepts:** `topic` (String)
- **Returns:** `true`

#### The `topic` argument

The topic from which you wish to unsubscribe. Calling this method removes `topic` from the stored list of subscribed topics. Subsequent calls to publish to that topic will fail silently, returning `false`.

### Example

For a full-featured RadioRadio demonstration, check out [the included example file](./example/index.html).


## Browser Support

RadioRadio works in all modern browsers. The library makes use of several new(ish) JavaScript methods, including:

- `Object.keys` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys))
- `Array.prototype.forEach()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))

Internet Explorer added native support for these features in version 9, but if you wish to support older versions of IE, check out the polyfills available on the above linked MDN pages. RadioRadio, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose to polyfill older versions of IE.

To avoid throwing JavaScript errors in browsers that don't support these features, you can [cut the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard):

```js
if (Object.keys && Array.forEach) {
    // Your scripts here…
}
```


## Acknowledgments

RadioRadio is inspired by [Morgan Roderick](https://github.com/mroderick)'s [PubSubJS](https://github.com/mroderick/PubSubJS).

RadioRadio is written and maintained by [Jason Garber](https://sixtwothree.org/) and, yes, it's named after [an Elvis Costello & The Attractions song](https://www.youtube.com/watch?v=eifljYPFW-E).


## License

RadioRadio is freely available under [The MIT License](http://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.