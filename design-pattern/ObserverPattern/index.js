class Subject {

    constructor() {
        this.observers = []
    }

    addOb(ob) {
        this.observers.push(ob)
    }
    rmOb(ob) {
        const index = this.observers.indexOf(ob)
        if (index >= 0) {
            this.observers.splice(index, 1)
        }
    }
    notify(msg) {
        this.observers.forEach(ob => {
            ob.update(msg)
        })
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }
    update(msg) {
        console.log(`${this.name} get notify ${msg}`);
    }
}


const sb = new Subject()

const ob1 = new Observer("kong")
const ob2 = new Observer("zhang")
sb.addOb(ob1)
sb.addOb(ob2)

sb.notify("nihao")

sb.rmOb(ob2)

sb.notify("haha")
