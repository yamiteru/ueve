import { S } from "../src/constants";
import { eve as eveAsync, sub } from "../src/async";
import { eve as eveSync } from "../src/sync";

describe("sub", () => {
	describe("async", () => {
		it("should add subscriber", () => {
			const fn = jest.fn();
			const click$ = eveAsync<number>();

			sub(click$, fn);

			expect(click$[S]).toBeInstanceOf(Set);
			expect(click$[S]?.has(fn)).toBe(true);
		});

		it("should ignore duplicate subscriber", () => {
			const fn = jest.fn();
			const click$ = eveAsync<number>();

			sub(click$, fn);
			sub(click$, fn);
			sub(click$, fn);

			expect(click$[S]?.size).toBe(1);
		});

		it("should add multiple different subscibers", () => {
			const fn1 = jest.fn();
			const fn2 = jest.fn();
			const fn3 = jest.fn();
			const click$ = eveAsync<number>();

			sub(click$, fn1);
			sub(click$, fn2);
			sub(click$, fn3);

			expect(click$[S]?.size).toBe(3);
		});

		it("should return unsubscribe function", () => {
			const fn = jest.fn();
			const click$ = eveAsync();
			const unsub = sub(click$, fn);

			expect(unsub).toBeDefined();
			expect(unsub).toBeInstanceOf(Function);
		});
	});

	describe("sync", () => {
		it("should add subscriber", () => {
			const fn = jest.fn();
			const click$ = eveSync<number>();

			sub(click$, fn);

			expect(click$[S]).toBeInstanceOf(Set);
			expect(click$[S]?.has(fn)).toBe(true);
		});

		it("should ignore duplicate subscriber", () => {
			const fn = jest.fn();
			const click$ = eveSync<number>();

			sub(click$, fn);
			sub(click$, fn);
			sub(click$, fn);

			expect(click$[S]?.size).toBe(1);
		});

		it("should add multiple different subscibers", () => {
			const fn1 = jest.fn();
			const fn2 = jest.fn();
			const fn3 = jest.fn();
			const click$ = eveSync<number>();

			sub(click$, fn1);
			sub(click$, fn2);
			sub(click$, fn3);

			expect(click$[S]?.size).toBe(3);
		});

		it("should return unsubscribe function", () => {
			const fn = jest.fn();
			const click$ = eveSync();
			const unsub = sub(click$, fn);

			expect(unsub).toBeDefined();
			expect(unsub).toBeInstanceOf(Function);
		});
	});

});
