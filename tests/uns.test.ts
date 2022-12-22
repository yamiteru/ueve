import { S } from "../src/constants";
import { eve as eveAsync, sub as subAsync, uns } from "../src/async";
import { eve as eveSync, sub as subSync } from "../src/sync";

describe("uns", () => {
	describe("async", () => {
		it("should unsubscibe using result of subscription", () => {
			const fn = jest.fn();
			const click$ = eveAsync();	
			const unsub = subAsync(click$, fn);

			unsub();

			expect(click$[S]?.size).toBe(0);
		});

		it("should unsubscibe by passing function reference", () => {
			const fn = jest.fn();
			const click$ = eveAsync();	
			
			subAsync(click$, fn);
			uns(click$, fn);

			expect(click$[S]?.size).toBe(0);
		});
	});

	describe("sync", () => {
		it("should unsubscibe using result of subscription", () => {
			const fn = jest.fn();
			const click$ = eveSync();	
			const unsub = subSync(click$, fn);

			unsub();

			expect(click$[S]?.size).toBe(0);
		});

		it("should unsubscibe by passing function reference", () => {
			const fn = jest.fn();
			const click$ = eveSync();	
			
			subSync(click$, fn);
			uns(click$, fn);

			expect(click$[S]?.size).toBe(0);
		});
	});
});
