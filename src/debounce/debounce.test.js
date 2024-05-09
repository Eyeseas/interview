import { debounce } from "./index";

describe("debounce", () => {
    let callback;
    let debouncedFn;

    beforeEach(() => {
        jest.useFakeTimers();
        callback = jest.fn();
        debouncedFn = debounce(callback, 1000);
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it("should call the function after the specified delay", () => {
        debouncedFn();
        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);
        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalled();
    });

    it("should reset the timer if debounced function is called again before delay", () => {
        debouncedFn();
        jest.advanceTimersByTime(500);
        debouncedFn(); // Reset the timer
        jest.advanceTimersByTime(500);
        expect(callback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalled();
    });

    it("should preserve the context of the original function", () => {
        const context = { value: "test" };
        const debouncedFnWithContext = debounce(function () {
            callback(this.value);
        }, 1000);

        debouncedFnWithContext.call(context);
        jest.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledWith("test");
    });
});
