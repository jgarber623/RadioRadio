var topics = {};

function topicIsValid(topic) {
  return typeof topic === 'string' && topic.match(/^\w+(\.\w+)*(\.\*)?$/);
}

function setPublishableQueue(topic) {
  var topicRegExp = new RegExp('^' + topic + '(\\.\\w+)*$'),
      wildcardRegExp = /\.\w+$/,
      wildcardTopic = topic.match(wildcardRegExp) ? topic.replace(wildcardRegExp, '.*') : false;

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

export default RadioRadio;
