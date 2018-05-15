/*!
 *  RadioRadio v0.3.0
 *
 *  A very basic JavaScript PubSub library.
 *
 *  Source code available at: https://github.com/jgarber623/RadioRadio
 *
 *  (c) 2016-present Jason Garber (https://sixtwothree.org)
 *
 *  RadioRadio may be freely distributed under the MIT license.
 */

(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.RadioRadio = factory();
})(this, function() {
  "use strict";
  var topics = {};
  function topicIsValid(topic) {
    return typeof topic === "string" && topic.match(/^\w+(\.\w+)*(\.\*)?$/);
  }
  function setPublishableQueue(topic) {
    var topicRegExp = new RegExp("^" + topic + "(\\.\\w+)*$"), wildcardRegExp = /\.\w+$/, wildcardTopic = topic.match(wildcardRegExp) ? topic.replace(wildcardRegExp, ".*") : false;
    return Object.keys(topics).filter(function(key) {
      return key === wildcardTopic || key.match(topicRegExp);
    });
  }
  var RadioRadio = {
    publish: function(topic, data) {
      var queue = topicIsValid(topic) ? setPublishableQueue(topic) : [];
      queue.forEach(function(key) {
        topics[key](data);
      });
      return queue.length ? queue : false;
    },
    subscribe: function(topic, subscriber) {
      if (topicIsValid(topic) && typeof subscriber === "function") {
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
  return RadioRadio;
});
