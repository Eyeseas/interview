Function.prototype.myApply = function (context, argArr) {

    let fn = Symbol()

    context[fn] = this

    let result;
    if (!argArr) {
        result = context[fn]()
    } else {
        result = context[fn](...argArr)
    }

    delete context[fn]

    return result
}

let user1 = {
    name: "kong", getName: function (age) {
        return `${this.name} ${age}`
    }
}

let user2 = {
    name: "zzh"
}




// Function.prototype.myBind = function (context, ...args) {
//     return (...extArgs) => this.myApply(context, [...args, ...extArgs])
// }

Function.prototype.myBind = function (context, ...args) {
    // context = context || window

    let self = this

    let fn = function (...extArgs) {
        self.myApply(this instanceof fn ? this : context, [...args, ...extArgs])
    }

    fn.prototype = Object.create(this.prototype)

    return fn
}

console.log(user1.getName.bind(user2)(121212))