const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._state = PENDING;
    this._value = null;
    this._handlers = [];
  }

  _changeState(state, value) {
    this._state = state;
    this._value = value;
  }

  _resolve(data) {
    this._changeState(FULFILLED, data);
  }

  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
}
