var RadioRadio = require('../src/radioradio.js');

describe('RadioRadio', () => {
	var stubData = { alpha: 'beta' },
		stubSubscriber = data => data.alpha,
		stubTopics = ['foo', 'foo.bar', 'foo.bar.biz'];

	afterEach(() => {
		stubTopics.forEach(topic => RadioRadio.unsubscribe(topic));
	});

	it('should not subscribe to a topic when no subscriber is given.', () => {
		var topic = RadioRadio.subscribe('foo');

		expect(topic).toBe(false);
	});

	it('should subscribe to a topic.', () => {
		var topic = RadioRadio.subscribe('foo', stubSubscriber);

		expect(topic).toBe('foo');
	});

	it('should subscribe to a namespaced topic.', () => {
		var topic = RadioRadio.subscribe('foo.bar', stubSubscriber);

		expect(topic).toBe('foo.bar');
	});

	it('should not publish to a topic when topic is not set.', () => {
		expect(RadioRadio.publish('foo', stubData)).toBe(false);
	});

	it('should publish to a topic.', () => {
		RadioRadio.subscribe('foo', stubSubscriber);

		expect(RadioRadio.publish('foo', stubData)).toEqual(['foo']);
	});

	it('should publish to namespaced topics.', () => {
		stubTopics.forEach(topic => {
			RadioRadio.subscribe(topic, stubSubscriber);
		});

		expect(RadioRadio.publish('foo', stubData)).toEqual(stubTopics);
	});

	it('should unsubscribe from a topic.', () => {
		RadioRadio.subscribe('foo', stubSubscriber);

		expect(RadioRadio.unsubscribe('foo')).toBe(true);
	});
});