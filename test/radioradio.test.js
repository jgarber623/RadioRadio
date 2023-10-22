import test from 'ava';

import * as RadioRadio from '../src/radioradio.js';

const mockData = { alpha: 'beta' };
const mockSubscriber = ({ alpha }) => alpha;
const mockTopics = ['foo', 'foo.*', 'foo.bar', 'foo.bar.biz'];

test('should not subscribe to a topic when topic is null', t => {
  t.false(RadioRadio.subscribe(null, mockSubscriber));
});

test('should not subscribe to a topic when topic is undefined', t => {
  t.false(RadioRadio.subscribe(undefined, mockSubscriber));
});

test('should not subscribe to a topic when topic is an empty string', t => {
  t.false(RadioRadio.subscribe('', mockSubscriber));
});

test('should not subscribe to a topic when topic contains invalid characters', t => {
  t.false(RadioRadio.subscribe('!', mockSubscriber));
});

test('should not subscribe to a namespaced wilcard topic when namespaced wildcard topic is invalid', t => {
  t.false(RadioRadio.subscribe('foo.*.bar', mockSubscriber));
});

test('should not subscribe to a topic when no subscriber is given', t => {
  t.false(RadioRadio.subscribe('foo'));
});

test('should subscribe to a topic', t => {
  t.is(RadioRadio.subscribe('foo', mockSubscriber), 'foo');

  RadioRadio.unsubscribe('foo');
});

test('should subscribe to a namespaced topic', t => {
  t.is(RadioRadio.subscribe('foo.bar', mockSubscriber), 'foo.bar');

  RadioRadio.unsubscribe('foo.bar');
});

test('should subscribe to a namespaced wildcard topic', t => {
  t.is(RadioRadio.subscribe('foo.*', mockSubscriber), 'foo.*');

  RadioRadio.unsubscribe('foo.*');
});

test('should not publish to a topic when topic is not subscribed', t => {
  t.false(RadioRadio.publish('foo', mockData));
});

test('should not publish to a topic when topic is null', t => {
  t.false(RadioRadio.publish(null));
});

test('should not publish to a topic when topic is undefined', t => {
  t.false(RadioRadio.publish(undefined))
});

test('should publish to a topic', t => {
  RadioRadio.subscribe('foo', mockSubscriber);

  t.deepEqual(RadioRadio.publish('foo', mockData), ['foo']);

  RadioRadio.unsubscribe('foo');
});

test('should publish to a namespaced topic', t => {
  RadioRadio.subscribe('foo.bar', mockSubscriber);

  t.deepEqual(RadioRadio.publish('foo.bar', mockData), ['foo.bar']);

  RadioRadio.unsubscribe('foo.bar');
});

test('should publish to a namespaced wildcard topic', t => {
  RadioRadio.subscribe('foo.*', mockSubscriber);

  t.deepEqual(RadioRadio.publish('foo.*', mockData), ['foo.*']);

  RadioRadio.unsubscribe('foo.*');
});

test('should publish to all topics within a namespace when top-level topic is published', t => {
  const topics = ['foo', 'foo.bar', 'foo.bar.biz'];

  for (const topic of topics) {
    RadioRadio.subscribe(topic, mockSubscriber);
  }

  t.deepEqual(RadioRadio.publish('foo', mockData), topics);

  for (const topic of topics) {
    RadioRadio.unsubscribe(topic);
  }
});

test('should publish to a namespaced wildcard topic when an adjacent namespaced topic is published', t => {
  const topics = ['foo.*', 'foo.bar'];

  for (const topic of topics) {
    RadioRadio.subscribe(topic, mockSubscriber);
  }

  t.deepEqual(RadioRadio.publish('foo.bar', mockData), topics);

  for (const topic of topics) {
    RadioRadio.unsubscribe(topic, mockSubscriber);
  }
});

test('should unsubscribe from a topic', t => {
  RadioRadio.subscribe('foo', mockSubscriber);

  t.true(RadioRadio.unsubscribe('foo'));

  RadioRadio.unsubscribe('foo');
});
