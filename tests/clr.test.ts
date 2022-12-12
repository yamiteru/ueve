import expect from "expect";
import { clr, eve, sub } from "../src";
import { S } from "../src/constants";

describe("clr", () => {
	it("should clear event", () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const fn3 = jest.fn();
		const click$ = eve();

		sub(click$, fn1);
		sub(click$, fn2);
		sub(click$, fn3);
		
		clr(click$);

		expect(click$[S]?.size).toBe(0);
	});
});
