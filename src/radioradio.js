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
			return key.match(topicRegExp(topic));
		});
	};

	var topicRegExp = function(topic) {
		return new RegExp('^' + topic ? topic : '\\w+' + '(\\.\\w*)*?$');
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
			if (typeof topic === 'string' && topic.match(topicRegExp()) && typeof subscriber === 'function') {
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