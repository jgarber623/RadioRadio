var RadioRadio = require('../src/radioradio.js');

describe('RadioRadio', () => {
	var mockData = { alpha: 'beta' },
		mockSubscriber = data => data.alpha,
		mockTopics = ['foo', 'foo.bar', 'foo.bar.biz'];

	afterEach(() => {
		mockTopics.forEach(topic => RadioRadio.unsubscribe(topic));
	});

	describe('#subscribe', () => {
		it('should not subscribe to a topic when topic is null.', () => {
			var topic = RadioRadio.subscribe();

			expect(topic).toBe(false);
		});

		it('should not subscribe to a topic when topic is undefined', () => {
			var topic = RadioRadio.subscribe();

			expect(topic).toBe(false);
		});

		it('should not subscribe to a topic when topic is an empty string', () => {
			var topic = RadioRadio.subscribe('');

			expect(topic).toBe(false);
		});

		it('should not subscribe to a topic when no subscriber is given.', () => {
			var topic = RadioRadio.subscribe('foo');

			expect(topic).toBe(false);
		});

		it('should subscribe to a topic.', () => {
			var topic = RadioRadio.subscribe('foo', mockSubscriber);

			expect(topic).toBe('foo');
		});

		it('should subscribe to a namespaced topic.', () => {
			var topic = RadioRadio.subscribe('foo.bar', mockSubscriber);

			expect(topic).toBe('foo.bar');
		});
	});

	describe('#publish', () => {
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

		it('should publish to all topics within a namespace when top-level topic is published.', () => {
			mockTopics.forEach(topic => {
				RadioRadio.subscribe(topic, mockSubscriber);
			});

			expect(RadioRadio.publish('foo', mockData)).toEqual(mockTopics);
		});
	});

	describe('#unsubscribe', () => {
		it('should unsubscribe from a topic.', () => {
			RadioRadio.subscribe('foo', mockSubscriber);

			expect(RadioRadio.unsubscribe('foo')).toBe(true);
		});
	});
});