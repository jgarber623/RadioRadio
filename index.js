const topics = {};

const topicIsValid = (topic) => {
  return typeof topic === "string" && topic.match(/^\w+(\.\w+)*(\.\*)?$/);
};

const setPublishableQueue = (topic) => {
  const topicRegExp = new RegExp(`^${topic}(\\.\\w+)*$`);
  const wildcardRegExp = /\.\w+$/;
  const wildcardTopic = wildcardRegExp.test(topic) ? topic.replace(wildcardRegExp, ".*") : false;

  return Object.keys(topics).filter((key) => {
    return key === wildcardTopic || key.match(topicRegExp);
  });
};

/**
 * @param {string} topic
 * @param {object} data
 * @returns {Array|false}
 */
export function publish(topic, data) {
  const queue = topicIsValid(topic) ? setPublishableQueue(topic) : [];

  for (const key of queue) {
    topics[key](data);
  }

  return queue.length > 0 ? queue : false;
}

/**
 * @param {string} topic
 * @param {Function} subscriber
 * @returns {string|false}
 */
export function subscribe(topic, subscriber) {
  if (topicIsValid(topic) && typeof subscriber === "function") {
    topics[topic] = subscriber;

    return topic;
  } else {
    return false;
  }
}

/**
 * @param {string} topic
 * @returns {true}
 */
export function unsubscribe(topic) {
  return delete topics[topic];
}
