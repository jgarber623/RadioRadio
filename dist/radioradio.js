/*!
 *  RadioRadio 0.1.0
 *
 *  A very basic JavaScript PubSub library.
 *
 *  Source code available at: https://github.com/jgarber623/RadioRadio
 *
 *  (c) 2015-present Jason Garber (http://sixtwothree.org)
 *
 *  RadioRadio may be freely distributed under the MIT license.
 */

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.RadioRadio = factory();
  }
})(this, function() {
  "use strict";
  var topics = {};
  return {
    publish: function(topic, data) {
      return topics.hasOwnProperty(topic) ? topics[topic](data) : false;
    },
    subscribe: function(topic, subscriber) {
      if (typeof subscriber === "function") {
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
});