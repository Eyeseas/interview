function deepClone(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (map.get(obj)) {
        return map.get(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }

    if (obj instanceof Array) {
        let cloneObj = [];
        obj.forEach((item) => {
            cloneObj.push(deepClone(item, map));
        });
        return cloneObj;
    }

    if (obj instanceof Set) {
        let cloneObj = new Set();
        obj.forEach((item) => {
            cloneObj.add(deepClone(item, map));
        });
        return cloneObj;
    }

    if (obj instanceof Map) {
        let cloneObj = new Map();
        obj.forEach((value, key) => {
            cloneObj.set(deepClone(key, map), deepClone(value, map));
        });
        return cloneObj;
    }

    let cloneObj = {};
    Reflect.ownKeys(obj).forEach((key) => {
        let value = obj[key];
        cloneObj[key] = deepClone(value, map);
    });
    return cloneObj;
}
