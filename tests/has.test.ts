import expect from "expect";
import { eve, has, sub } from "../src";

describe("has", () => {
	it("should return true if event has subscriber", () => {
		const fn = jest.fn();
		const click$ = eve();

		sub(click$, fn);

		expect(has(click$, fn)).toBe(true);
	});

	it("should return false if event does not have subscriber", () => {
		const fn = jest.fn();
		const click$ = eve();

		expect(has(click$, fn)).toBe(false);
	});
});
