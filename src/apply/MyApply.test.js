// Import the myApply function
import { myApply } from "./MyApply";

// Extend the Function prototype to include myApply method for testing
Function.prototype.myApply = myApply;

describe("myApply", () => {
    test("calls function with specified context", () => {
        const context = { value: 42 };
        function testFunction() {
            return this.value;
        }

        expect(testFunction.myApply(context)).toBe(42);
    });

    test("calls function with specified context and arguments", () => {
        const context = { multiplier: 2 };
        function testFunction(a, b) {
            return (a + b) * this.multiplier;
        }

        expect(testFunction.myApply(context, [5, 3])).toBe(16);
    });

    test('handles functions that do not use "this"', () => {
        function testFunction(a, b) {
            return a - b;
        }

        // Context is irrelevant here, but still needs to be passed
        expect(testFunction.myApply({}, [9, 5])).toBe(4);
    });

    test("returns undefined when calling functions that do not return a value", () => {
        function testFunction() {
            console.log("test");
        }

        expect(testFunction.myApply({})).toBeUndefined();
    });

    test("correctly handles no arguments passed to the function", () => {
        const context = { value: 7 };
        function testFunction() {
            return this.value;
        }

        expect(testFunction.myApply(context)).toBe(7);
    });
});
