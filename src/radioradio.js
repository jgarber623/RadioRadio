(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.RadioRadio = factory();
	}
}(this, function() {
	'use strict';

	var topics = {};

	var filterTopics = function(topic) {
		return Object.keys(topics).filter(function(key) {
			return key.match(new RegExp('^' + topic + '(?:\.[a-zA-Z0-9]*)*?$'));
		});
	};

	return {
		publish: function(topic, data) {
			var queue = filterTopics(topic);

			if (queue.length) {
				queue.forEach(function(element) {
					topics[element](data);
				});

				return queue;
			} else {
				return false;
			}
		},

		subscribe: function(topic, subscriber) {
			if (typeof subscriber === 'function') {
				topics[topic] = subscriber;

				return topic;
			} else {
				return false;
			}
		},

		unsubscribe: function(topic) {
			return delete topics[topic];
		}
	};
}));