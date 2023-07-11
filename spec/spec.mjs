import * as RadioRadio from '../dist/radioradio.mjs';

describe('RadioRadio', () => {
  const mockData = { alpha: 'beta' };
  const mockSubscriber = data => data.alpha;
  const mockTopics = ['foo', 'foo.*', 'foo.bar', 'foo.bar.biz'];

  afterEach(() => {
    mockTopics.forEach(topic => RadioRadio.unsubscribe(topic));
  });

  describe('subscribe()', () => {
    it('should not subscribe to a topic when topic is null.', () => {
      const topic = RadioRadio.subscribe(null, mockSubscriber);

      expect(topic).toBe(false);
    });

    it('should not subscribe to a topic when topic is undefined', () => {
      const topic = RadioRadio.subscribe(undefined, mockSubscriber);

      expect(topic).toBe(false);
    });

    it('should not subscribe to a topic when topic is an empty string', () => {
      const topic = RadioRadio.subscribe('', mockSubscriber);

      expect(topic).toBe(false);
    });

    it('should not subscribe to a topic when topic contains invalid characters', () => {
      const topic = RadioRadio.subscribe('!', mockSubscriber);

      expect(topic).toBe(false);
    });

    it('should not subscribe to a namespaced wilcard topic when namespaced wildcard topic is invalid.', () => {
      const topic = RadioRadio.subscribe('foo.*.bar', mockSubscriber);

      expect(topic).toBe(false);
    });

    it('should not subscribe to a topic when no subscriber is given.', () => {
      const topic = RadioRadio.subscribe('foo');

      expect(topic).toBe(false);
    });

    it('should subscribe to a topic.', () => {
      const topic = RadioRadio.subscribe('foo', mockSubscriber);

      expect(topic).toBe('foo');
    });

    it('should subscribe to a namespaced topic.', () => {
      const topic = RadioRadio.subscribe('foo.bar', mockSubscriber);

      expect(topic).toBe('foo.bar');
    });

    it('should subscribe to a namespaced wildcard topic.', () => {
      const topic = RadioRadio.subscribe('foo.*', mockSubscriber);

      expect(topic).toBe('foo.*');
    });
  });

  describe('publish()', () => {
    it('should not publish to a topic when topic is not subscribed.', () => {
      expect(RadioRadio.publish('foo', mockData)).toBe(false);
    });

    it('should not publish to a topic when topic is null.', () => {
      expect(RadioRadio.publish(null)).toBe(false);
    });

    it('should not publish to a topic when topic is undefined.', () => {
      expect(RadioRadio.publish(undefined)).toBe(false);
    });

    it('should publish to a topic.', () => {
      RadioRadio.subscribe('foo', mockSubscriber);

      expect(RadioRadio.publish('foo', mockData)).toEqual(['foo']);
    });

    it('should publish to a namespaced topic', () => {
      RadioRadio.subscribe('foo.bar', mockSubscriber);

      expect(RadioRadio.publish('foo.bar', mockData)).toEqual(['foo.bar']);
    });

    it('should publish to a namespaced wildcard topic.', () => {
      RadioRadio.subscribe('foo.*', mockSubscriber);

      expect(RadioRadio.publish('foo.*', mockData)).toEqual(['foo.*']);
    });

    it('should publish to all topics within a namespace when top-level topic is published.', () => {
      const topics = ['foo', 'foo.bar', 'foo.bar.biz'];

      topics.forEach(topic => {
        RadioRadio.subscribe(topic, mockSubscriber);
      });

      expect(RadioRadio.publish('foo', mockData)).toEqual(topics);
    });

    it('should publish to a namespaced wildcard topic when an adjacent namespaced topic is published.', () => {
      const topics = ['foo.*', 'foo.bar'];

      topics.forEach(topic => {
        RadioRadio.subscribe(topic, mockSubscriber);
      });

      expect(RadioRadio.publish('foo.bar', mockData)).toEqual(topics);
    });
  });

  describe('unsubscribe()', () => {
    it('should unsubscribe from a topic.', () => {
      RadioRadio.subscribe('foo', mockSubscriber);

      expect(RadioRadio.unsubscribe('foo')).toBe(true);
    });
  });
});
