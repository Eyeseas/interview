const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function runMicroTask(callback) {
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver) {
        const dom = document.createElement("p");
        const observer = new MutationObserver(callback);
        observer.observe(dom, { childList: true });
        dom.innerHTML = "1";
    } else {
        setTimeout(callback, 0);
    }
}

function isPromise(obj) {
    return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}

class MyPromise {
    constructor(executor) {
        this._state = PENDING;
        this._value = null;
        this._handlers = [];

        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushHandlers(FULFILLED, onFulfilled, resolve, reject);
            this._pushHandlers(REJECTED, onRejected, resolve, reject);
            this._runHandlers();
        });
    }

    _runHandlers() {
        if (this._state === PENDING) {
            return;
        }
        while (this._handlers[0]) {
            this._runOneHandler(this._handlers[0]);
            this._handlers.shift();
        }
    }

    _runOneHandler({ executor, state, resolve, reject }) {
        runMicroTask(() => {
            if (this._state !== state) {
                return;
            }

            // 传递的后续处理不是函数
            if (typeof executor !== "function") {
                this._state === FULFILLED
                    ? resolve(this._value)
                    : reject(this._value);
                return;
            }

            try {
                const result = executor(this._value);
                if (isPromise(result)) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    _pushHandlers(state, executor, resolve, reject) {
        this._handlers.push({
            state,
            executor,
            resolve,
            reject,
        });
    }

    _changeState(state, value) {
        if (this._state !== PENDING) {
            return;
        }
        this._state = state;
        this._value = value;

        this._runHandlers();
    }

    _resolve(data) {
        this._changeState(FULFILLED, data);
    }

    _reject(reason) {
        this._changeState(REJECTED, reason);
    }
}
