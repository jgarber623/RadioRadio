var RadioRadio = require('../src/radioradio.js');

describe('RadioRadio', function() {
	var stubData = { biz: 'baz' },
		stubSubscriber = function(data) {
			return data.biz;
		};

	afterEach(function() {
		RadioRadio.unsubscribe('foo');
	});

	it('should not subscribe to a topic when no subscriber is given.', function() {
		var topic = RadioRadio.subscribe('foo');

		expect(topic).toBe(false);
	});

	it('should subscribe to a topic.', function() {
		var topic = RadioRadio.subscribe('foo', stubSubscriber);

		expect(topic).toBe('foo');
	});

	it('should not publish to a topic when topic is not set.', function() {
		expect(RadioRadio.publish('foo', stubData)).toBe(false);
	});

	it('should publish to a topic.', function() {
		var topic = RadioRadio.subscribe('foo', stubSubscriber);

		expect(RadioRadio.publish('foo', stubData)).toEqual(['foo']);
	});

	it('should unsubscribe from a topic.', function() {
		var topic = RadioRadio.subscribe('foo', stubSubscriber);

		expect(RadioRadio.unsubscribe('foo')).toBe(true);
	});
});