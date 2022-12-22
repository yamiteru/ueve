import { T, S } from "../src/constants";
import { eve as eveAsync } from "../src/async";
import { eve as eveSync } from "../src/sync";

describe("eve", () => {
	describe("async", () => {
		it("should create default event", () => {
			const click$ = eveAsync();

			expect(click$).toBeDefined();
		});

		it("should create event with T function", () => {
			const fn = jest.fn();
			const click$ = eveAsync<number>(fn);

			expect(click$[T]).toBe(fn);
		});

		it("should have secret properties", () => {
			const click$ = eveAsync();

			expect(click$[S]).toBeDefined();
			expect(click$[T]).toBeDefined();
		});

		it("should create event with no set", () => {
			const click$ = eveAsync();

			expect(click$[S]).toBe(null);
		});
	});

	describe("sync", () => {
		it("should create default event", () => {
			const click$ = eveSync();

			expect(click$).toBeDefined();
		});

		it("should create event with T function", () => {
			const fn = jest.fn();
			const click$ = eveSync<number>(fn);

			expect(click$[T]).toBe(fn);
		});

		it("should have secret properties", () => {
			const click$ = eveSync();

			expect(click$[S]).toBeDefined();
			expect(click$[T]).toBeDefined();
		});

		it("should create event with no set", () => {
			const click$ = eveSync();

			expect(click$[S]).toBe(null);
		});
	});
});
