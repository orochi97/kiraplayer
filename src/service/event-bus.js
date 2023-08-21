// const events = require('events')
// const systemEventBus = new events.EventEmitter()

// // 传递到 web 那边，原型方法会丢失
// // eslint-disable-next-line no-self-assign
// systemEventBus.on = systemEventBus.on;
// // eslint-disable-next-line no-self-assign
// systemEventBus.emit = systemEventBus.emit;

// module.exports = systemEventBus

class EventEmitter {
  constructor () {
    this.queue = {};
    this.onceQueue = {};
  }
  once(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('The second param shoule be function');
    }
    if (this.queue[event]) {
      delete this.queue[event];
    }
    if (!this.onceQueue[event]) {
      this.onceQueue[event] = [];
    }
    this.onceQueue[event].push(callback);
  }
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('The second param shoule be function');
    }
    if (this.onceQueue[event]) {
      delete this.onceQueue[event];
    }
    if (!this.queue[event]) {
      this.queue[event] = [];
    }
    this.queue[event].push(callback);
  }
  off(event, callback) {
    if (callback) {
      const queue = this.queue[event] || this.onceQueue[event];
      if (!queue) return;

      const index = queue.findIndex(cb => cb === callback);
      queue.splice(index, 1);
    } else {
      delete this.queue[event];
      delete this.onceQueue[event];
    }
  }
  emit(event, ...data) {
    if (this.queue[event]) {
      this.queue[event].forEach((cb) => {
        cb(...data);
      });
    }
    if (this.onceQueue[event]) {
      this.onceQueue[event].forEach((cb) => {
        cb(...data);
      });
      this.off(event);
    }
  }
}

const systemEventBus = new EventEmitter();

// 传递到 web 那边，原型方法会丢失
// eslint-disable-next-line no-self-assign
systemEventBus.on = systemEventBus.on.bind(systemEventBus);
// eslint-disable-next-line no-self-assign
systemEventBus.emit = systemEventBus.emit.bind(systemEventBus);

module.exports = systemEventBus;
