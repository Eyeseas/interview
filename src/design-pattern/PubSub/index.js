class PubSub {
    constructor() {
        this.subscribers = {}
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = []
        }
        this.subscribers[event].push(callback)


        return () => this.unSubscribe(event, callback)
    }

    unSubscribe(event, callback) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback)
        }
    }

    publish(event, data) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(cb => {
                cb(data)
            })
        }
    }
}


// 使用示例
const pubSub = new PubSub();

// 订阅事件
const subscription = pubSub.subscribe('event1', data => {
    console.log(`Received data: ${data}`);
});

// 发布事件
pubSub.publish('event1', 'Hello World!');

// 取消订阅
subscription();

// 再次发布事件，不会有输出，因为已经取消订阅了
pubSub.publish('event1', 'Hello again!');