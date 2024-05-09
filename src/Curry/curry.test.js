import { curry } from "./curry"; // Adjust the import path accordingly

describe("curry", () => {
    // Test for a simple sum function
    test("curries a function and allows partial application", () => {
        function sum(a, b, c) {
            return a + b + c;
        }
        const curriedSum = curry(sum);

        expect(curriedSum(1)(2)(3)).toBe(6);
        expect(curriedSum(1, 2)(3)).toBe(6);
        expect(curriedSum(1)(2, 3)).toBe(6);
        expect(curriedSum(1, 2, 3)).toBe(6);
    });

    // Test for handling more complex scenarios
    test("works with functions of any arity", () => {
        function complexFunction(a, b, c, d) {
            return a * b * c * d;
        }
        const curriedComplex = curry(complexFunction);

        expect(curriedComplex(2)(3)(4)(5)).toBe(120);
        expect(curriedComplex(2, 3)(4, 5)).toBe(120);
        expect(curriedComplex(2, 3, 4)(5)).toBe(120);
        expect(curriedComplex(2)(3, 4, 5)).toBe(120);
        expect(curriedComplex(2, 3, 4, 5)).toBe(120);
    });

    // Test for no arguments passed
    test("handles no arguments passed in curried function", () => {
        function noArgs() {
            return true;
        }
        const curriedNoArgs = curry(noArgs);

        expect(curriedNoArgs()).toBe(true);
    });
});
