// Import the Mybind function
import { bind1 } from "../bind/bind";

// Extend the Function prototype to include Mybind method for testing
Function.prototype.bind1 = bind1;

describe("Mybind", () => {
    test("binds context to a function", () => {
        const context = { value: 30 };
        function testFunction() {
            return this.value;
        }

        const boundFunction = testFunction.bind1(context);
        expect(boundFunction()).toBe(30);
    });

    test("binds context and arguments to a function", () => {
        const context = { multiplier: 3 };
        function testFunction(a, b) {
            return (a + b) * this.multiplier;
        }

        const boundFunction = testFunction.bind1(context, 2, 3);
        expect(boundFunction()).toBe(15);
    });

    test("allows for additional arguments to be passed when invoked", () => {
        const context = { multiplier: 4 };
        function testFunction(a, b) {
            return (a + b) * this.multiplier;
        }

        const boundFunction = testFunction.bind1(context, 2);
        expect(boundFunction(3)).toBe(20);
    });

    test("correctly sets 'this' to the new object when used as a constructor", () => {
        function TestFunction(a) {
            this.a = a;
        }

        const BoundFunction = TestFunction.bind1({});
        const instance = new BoundFunction(5);
        expect(instance.a).toBe(5);
        expect(instance instanceof TestFunction).toBeTruthy();
    });
});
