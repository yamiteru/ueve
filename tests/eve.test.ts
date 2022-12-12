import { eve } from "../src";
import { S, T } from "../src/constants";

describe("eve", () => {
	it("should create default event", () => {
		const click$ = eve();

		expect(click$).toBeDefined();
	});

	it("should create event with T function", () => {
		const fn = jest.fn();
		const click$ = eve<number>(fn);

		expect(click$[T]).toBe(fn);
	});

	it("should have secret properties", () => {
		const click$ = eve();

		expect(click$[S]).toBeDefined();
		expect(click$[T]).toBeDefined();
	});

	it("should create event with no set", () => {
		const click$ = eve();

		expect(click$[S]).toBe(null);
	});
});
