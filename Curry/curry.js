// function Curry(fn) {
//     let fnArgLength = fn.length;
//     let mergeArgs = [];

//     function next(...extArgs) {
//         mergeArgs = [...mergeArgs, ...extArgs];
//         console.log(mergeArgs.length, fnArgLength);
//         if (mergeArgs.length < fnArgLength) {
//             return next;
//         } else {
//             return fn.apply(this, mergeArgs.slice(0, fnArgLength.length));
//         }
//     }

//     return next;
// }

function Curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
const add = (a, b, c, d, e) => {
    return a + b + c + d + e;
};

const newAdd = Curry(add);

console.log(newAdd(1, 2)(2)(3)(4,5));
