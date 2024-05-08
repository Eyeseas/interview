import { myApply } from "../apply/MyApply";

Function.prototype.myApply = myApply;

export function bind1(context, ...args) {
    let self = this;

    let fn = function (...extArgs) {
        return self.myApply(this instanceof fn ? this : context, [
            ...args,
            ...extArgs,
        ]);
    };

    fn.prototype = Object.create(this.prototype);

    return fn;
}
