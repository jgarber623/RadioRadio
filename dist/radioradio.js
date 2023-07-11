/*!
 *  RadioRadio v1.0.2
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
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define([ "exports" ], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
  factory(global.RadioRadio = {}));
})(this, (function(exports) {
  "use strict";
  const topics = {};
  const topicIsValid = topic => typeof topic === "string" && topic.match(/^\w+(\.\w+)*(\.\*)?$/);
  const setPublishableQueue = topic => {
    const topicRegExp = new RegExp(`^${topic}(\\.\\w+)*$`);
    const wildcardRegExp = /\.\w+$/;
    const wildcardTopic = topic.match(wildcardRegExp) ? topic.replace(wildcardRegExp, ".*") : false;
    return Object.keys(topics).filter((key => key === wildcardTopic || key.match(topicRegExp)));
  };
  function publish(topic, data) {
    const queue = topicIsValid(topic) ? setPublishableQueue(topic) : [];
    queue.forEach((key => topics[key](data)));
    return queue.length ? queue : false;
  }
  function subscribe(topic, subscriber) {
    if (topicIsValid(topic) && typeof subscriber === "function") {
      topics[topic] = subscriber;
      return topic;
    } else {
      return false;
    }
  }
  function unsubscribe(topic) {
    return delete topics[topic];
  }
  exports.publish = publish;
  exports.subscribe = subscribe;
  exports.unsubscribe = unsubscribe;
}));
