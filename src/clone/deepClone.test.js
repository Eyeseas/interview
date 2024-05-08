const deepClone = require('./deepClone');

describe('deepClone', () => {
    test('clones primitives', () => {
        const number = 42;
        expect(deepClone(number)).toBe(number);

        const string = "Hello";
        expect(deepClone(string)).toBe(string);
    });

    test('clones Date objects', () => {
        const date = new Date();
        const clonedDate = deepClone(date);
        expect(clonedDate).toEqual(date);
        expect(clonedDate).not.toBe(date);
    });

    test('clones RegExp objects', () => {
        const regex = /hello/gi;
        const clonedRegex = deepClone(regex);
        expect(clonedRegex).toEqual(regex);
        expect(clonedRegex).not.toBe(regex);
    });

    test('clones Set objects', () => {
        const set = new Set([1, 2, 3]);
        const clonedSet = deepClone(set);
        expect(clonedSet).toEqual(set);
        expect(clonedSet).not.toBe(set);
    });

    test('clones Map objects', () => {
        const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
        const clonedMap = deepClone(map);
        expect(clonedMap).toEqual(map);
        expect(clonedMap).not.toBe(map);
    });

    test('clones complex objects', () => {
        const complexObj = {
            number: 1,
            string: "Test",
            date: new Date(),
            regex: /test/g,
            set: new Set([1, 2, 3]),
            map: new Map([['key', 'value']]),
            array: [1, 2, 3],
            nested: {
                number: 2,
                string: "Nested"
            }
        };
        const clonedObj = deepClone(complexObj);
        expect(clonedObj).toEqual(complexObj);
        expect(clonedObj).not.toBe(complexObj);
        expect(clonedObj.date).not.toBe(complexObj.date);
        expect(clonedObj.regex).not.toBe(complexObj.regex);
        expect(clonedObj.set).not.toBe(complexObj.set);
        expect(clonedObj.map).not.toBe(complexObj.map);
        expect(clonedObj.nested).not.toBe(complexObj.nested);
    });
});