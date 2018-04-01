(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RadioRadio = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  var topics = {};

  var topicIsValid = function(topic) {
    return typeof topic === 'string' && topic.match(/^\w+(\.\w+)*(\.\*)?$/);
  };

  var setPublishableQueue = function(topic) {
    var topicRegExp = new RegExp('^' + topic + '(\\.\\w+)*$'),
        wildcardRegExp = /\.\w+$/,
        wildcardTopic = topic.match(wildcardRegExp) ? topic.replace(wildcardRegExp, '.*') : false;

    return Object.keys(topics).filter(function(key) {
      return key === wildcardTopic || key.match(topicRegExp);
    });
  };

  return {
    publish: function(topic, data) {
      var queue = topicIsValid(topic) ? setPublishableQueue(topic) : [];

      queue.forEach(function(key) {
        topics[key](data);
      });

      return queue.length ? queue : false;
    },

    subscribe: function(topic, subscriber) {
      if (topicIsValid(topic) && typeof subscriber === 'function') {
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
