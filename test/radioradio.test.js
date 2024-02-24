import assert from 'node:assert';
import test from 'node:test';

import * as RadioRadio from '../src/radioradio.js';

const mockData = { alpha: 'beta' };
const mockSubscriber = ({ alpha }) => alpha;

test('should not subscribe to a topic when topic is null', t => {
  assert.strictEqual(RadioRadio.subscribe(null, mockSubscriber), false);
});

test('should not subscribe to a topic when topic is undefined', t => {
  assert.strictEqual(RadioRadio.subscribe(undefined, mockSubscriber), false);
});

test('should not subscribe to a topic when topic is an empty string', t => {
  assert.strictEqual(RadioRadio.subscribe('', mockSubscriber), false);
});

test('should not subscribe to a topic when topic contains invalid characters', t => {
  assert.strictEqual(RadioRadio.subscribe('!', mockSubscriber), false);
});

test('should not subscribe to a namespaced wilcard topic when namespaced wildcard topic is invalid', t => {
  assert.strictEqual(RadioRadio.subscribe('foo.*.bar', mockSubscriber), false);
});

test('should not subscribe to a topic when no subscriber is given', t => {
  assert.strictEqual(RadioRadio.subscribe('foo'), false);
});

test('should subscribe to a topic', t => {
  assert.strictEqual(RadioRadio.subscribe('foo', mockSubscriber), 'foo');

  RadioRadio.unsubscribe('foo');
});

test('should subscribe to a namespaced topic', t => {
  assert.strictEqual(RadioRadio.subscribe('foo.bar', mockSubscriber), 'foo.bar');

  RadioRadio.unsubscribe('foo.bar');
});

test('should subscribe to a namespaced wildcard topic', t => {
  assert.strictEqual(RadioRadio.subscribe('foo.*', mockSubscriber), 'foo.*');

  RadioRadio.unsubscribe('foo.*');
});

test('should not publish to a topic when topic is not subscribed', t => {
  assert.strictEqual(RadioRadio.publish('foo', mockData), false);
});

test('should not publish to a topic when topic is null', t => {
  assert.strictEqual(RadioRadio.publish(null), false);
});

test('should not publish to a topic when topic is undefined', t => {
  assert.strictEqual(RadioRadio.publish(), false);
});

test('should publish to a topic', t => {
  RadioRadio.subscribe('foo', mockSubscriber);

  assert.deepEqual(RadioRadio.publish('foo', mockData), ['foo']);

  RadioRadio.unsubscribe('foo');
});

test('should publish to a namespaced topic', t => {
  RadioRadio.subscribe('foo.bar', mockSubscriber);

  assert.deepEqual(RadioRadio.publish('foo.bar', mockData), ['foo.bar']);

  RadioRadio.unsubscribe('foo.bar');
});

test('should publish to a namespaced wildcard topic', t => {
  RadioRadio.subscribe('foo.*', mockSubscriber);

  assert.deepEqual(RadioRadio.publish('foo.*', mockData), ['foo.*']);

  RadioRadio.unsubscribe('foo.*');
});

test('should publish to all topics within a namespace when top-level topic is published', t => {
  const topics = ['foo', 'foo.bar', 'foo.bar.biz'];

  for (const topic of topics) {
    RadioRadio.subscribe(topic, mockSubscriber);
  }

  assert.deepEqual(RadioRadio.publish('foo', mockData), topics);

  for (const topic of topics) {
    RadioRadio.unsubscribe(topic);
  }
});

test('should publish to a namespaced wildcard topic when an adjacent namespaced topic is published', t => {
  const topics = ['foo.*', 'foo.bar'];

  for (const topic of topics) {
    RadioRadio.subscribe(topic, mockSubscriber);
  }

  assert.deepEqual(RadioRadio.publish('foo.bar', mockData), topics);

  for (const topic of topics) {
    RadioRadio.unsubscribe(topic, mockSubscriber);
  }
});

test('should unsubscribe from a topic', t => {
  RadioRadio.subscribe('foo', mockSubscriber);

  assert.strictEqual(RadioRadio.unsubscribe('foo'), true);

  RadioRadio.unsubscribe('foo');
});
