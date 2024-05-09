export function curry(fn) {
    return function curried(...args) {
        // 检查当前收集到的参数数量是否足够原函数执行
        if (args.length >= fn.length) {
            // 如果足够，直接执行原函数，但只传入原函数所需数量的参数
            return fn.apply(this, args.slice(0, fn.length));
        } else {
            // 如果不够，返回一个新的函数，继续收集参数
            return function (...args2) {
                // 递归调用curried，合并之前和当前的参数
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
