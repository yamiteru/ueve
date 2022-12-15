import { S } from "../src/private/constants";
import { eve as eveAsync, sub as subAsync, clr } from "../src/async";
import { eve as eveSync, sub as subSync } from "../src/sync";

describe("clr", () => {
	describe("async", () => {
		it("should clear event", () => {
			const fn1 = jest.fn();
			const fn2 = jest.fn();
			const fn3 = jest.fn();
			const click$ = eveAsync();

			subAsync(click$, fn1);
			subAsync(click$, fn2);
			subAsync(click$, fn3);
			
			clr(click$);

			expect(click$[S]?.size).toBe(0);
		});
	});

	describe("sync", () => {
		it("should clear event", () => {
			const fn1 = jest.fn();
			const fn2 = jest.fn();
			const fn3 = jest.fn();
			const click$ = eveSync();

			subSync(click$, fn1);
			subSync(click$, fn2);
			subSync(click$, fn3);
			
			clr(click$);

			expect(click$[S]?.size).toBe(0);
		});
	});
});
