import expect from "expect";
import { eve, sub, uns } from "../src";
import { S } from "../src/constants";

describe("uns", () => {
	it("should unsubscibe using result of subscription", () => {
		const fn = jest.fn();
		const click$ = eve();	
		const unsub = sub(click$, fn);

		unsub();

		expect(click$[S]?.size).toBe(0);
	});

	it("should unsubscibe by passing function reference", () => {
		const fn = jest.fn();
		const click$ = eve();	
		
		sub(click$, fn);
		uns(click$, fn);

		expect(click$[S]?.size).toBe(0);
	});
});
