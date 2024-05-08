export function Create(fn, ...args) {
    let obj = Object.create(fn.prototype);

    let res = fn.apply(obj, args);

    return typeof res === "object" ? res : obj;
}
