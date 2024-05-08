import { Create } from "./new";
describe("Create function", () => {
    test("creates an instance of a function with arguments", () => {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        const person = Create(Person, "John Doe", 30);

        expect(person).toBeInstanceOf(Person);
        expect(person.name).toBe("John Doe");
        expect(person.age).toBe(30);
    });

    test("handles constructor functions that return an object", () => {
        function Car(model, year) {
            this.model = model;
            this.year = year;

            return { type: "Car", model, year };
        }

        const car = Create(Car, "Toyota", 2020);

        expect(car).not.toBeInstanceOf(Car); // Because Car constructor returns an object
        expect(car.type).toBe("Car");
        expect(car.model).toBe("Toyota");
        expect(car.year).toBe(2020);
    });

    test("handles constructor functions that return a non-object", () => {
        function Gadget(name) {
            this.name = name;

            return name; // Return non-object value
        }

        const gadget = Create(Gadget, "Smartphone");

        expect(gadget).toBeInstanceOf(Gadget); // Should ignore the returned non-object value
        expect(gadget.name).toBe("Smartphone");
    });
});
