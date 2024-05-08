export function myApply(context, argArr) {
    let fn = Symbol();

    context[fn] = this;

    let result;
    if (!argArr) {
        result = context[fn]();
    } else {
        result = context[fn](...argArr);
    }

    delete context[fn];

    return result;
}
