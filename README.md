> [!IMPORTANT]
> This project has moved to [codeberg.org/jgarber/RadioRadio](https://codeberg.org/jgarber/RadioRadio).

# RadioRadio

**A very small, lightweight, dependency-free JavaScript [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.**

[![npm](https://img.shields.io/npm/v/@jgarber/radioradio.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/radioradio)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/radioradio.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/radioradio)
[![Build](https://img.shields.io/github/actions/workflow/status/jgarber623/RadioRadio/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/jgarber623/RadioRadio/actions/workflows/ci.yml)

> [!NOTE]
> RadioRadio is feature complete and will only be updated to address bugs or security issues.

### Key Features

- Supports namespaced events (e.g. `foo.bar`)
- Dependency-free
- JavaScript module (ESM)

## Getting RadioRadio

You've got a couple options for adding RadioRadio to your project:

- [Download a release](https://github.com/jgarber623/RadioRadio/releases) from GitHub and do it yourself _(old school)_.
- Install using [npm](https://www.npmjs.com/package/@jgarber/radioradio): `npm install @jgarber/radioradio --save`
- Install using [Yarn](https://yarnpkg.com/en/package/@jgarber/radioradio): `yarn add @jgarber/radioradio`

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
RadioRadio.publish("foo.bar", data);
```

…or, to a topic and any topics within its namespace:

```js
RadioRadio.publish("foo", data);
```

Publishing to the namespace `foo` will publish to `foo` and _all_ topics namespaced to `foo` (e.g. `foo.bar`, `foo.biz`, `foo.baz`). As mentioned above in [Subscribing](#subscribing), topics may be deeply nested (e.g. `foo.bar.biz`) which will affect publishing to namespaces:

```js
RadioRadio.publish("foo", data);     // publishes to `foo`, `foo.bar`, `foo.bar.biz`
RadioRadio.publish("foo.bar", data); // publishes to `foo.bar`, `foo.bar.biz`
```

Wildcard topics within a namespace (e.g. `foo.*`) will be published alongside adjacent (e.g. `foo.bar`, `foo.biz`) published topics:

```js
RadioRadio.subscribe("foo.bar", subscriber);
RadioRadio.subscribe("foo.*", wildcardSubscriber);

RadioRadio.publish("foo.bar", data); // publishes to `foo.bar` and `foo.*`
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

For a full-featured RadioRadio demonstration, check out [the demo page](https://jgarber623.github.io/RadioRadio/example/) and [the example file](https://github.com/jgarber623/RadioRadio/blob/main/example/index.html).

## Browser Support

**RadioRadio works in modern browsers.** The library makes use of several new(ish) JavaScript methods and, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose whether or not to polyfill features for older browsers.

## Acknowledgments

RadioRadio is inspired by [Morgan Roderick](https://github.com/mroderick)'s [PubSubJS](https://github.com/mroderick/PubSubJS).

RadioRadio is written and maintained by [Jason Garber](https://sixtwothree.org) and, yes, it's named after [an Elvis Costello & The Attractions song](https://www.youtube.com/watch?v=eifljYPFW-E). It's also another in a growing line of small, curiously-named JavaScript utilities:

- [CashCash](https://github.com/jgarber623/CashCash), a very small DOM library inspired by [jQuery](https://jquery.com).
- [RouterRouter](https://github.com/jgarber623/RouterRouter), a very small routing library extracted from [Backbone's Router](http://backbonejs.org/docs/backbone.html#section-185).
- [TemplateTemplate](https://github.com/jgarber623/TemplateTemplate), a very small `<template>` manipulation library.

## License

RadioRadio is freely available under [The MIT License](https://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.
