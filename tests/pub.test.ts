import expect from "expect";
import { eve, pub, sub} from "../src";

describe("pub", () => {
	it("should publish valid value to all subscribers", async () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const click$ = eve<number>();

		sub(click$, fn1);
		sub(click$, fn2);

		await pub(click$, 1);

		expect(fn1).toHaveBeenCalledTimes(1);
		expect(fn2).toHaveBeenCalledTimes(1);
	});

	it("should not publish invalid value to any subscriber", async () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const click$ = eve<number>();

		sub(click$, fn1);
		sub(click$, fn2);

		await pub(click$, undefined);

		expect(fn1).toHaveBeenCalledTimes(0);
		expect(fn2).toHaveBeenCalledTimes(0);
	});
	
	it("should publish transformed value to all subscribers", async () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const click$ = eve<number>(async (v) => v*2);

		sub(click$, fn1);
		sub(click$, fn2);

		await pub(click$, 1);

		expect(fn1).toHaveBeenCalledTimes(1);
		expect(fn1).toHaveBeenLastCalledWith(2);
		expect(fn2).toHaveBeenCalledTimes(1);
		expect(fn2).toHaveBeenLastCalledWith(2);
	});

	it("should not publish invalid transformed value to any subscriber", async () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const click$ = eve<number>(async () => undefined);

		sub(click$, fn1);
		sub(click$, fn2);

		await pub(click$, 1);

		expect(fn1).toHaveBeenCalledTimes(0);
		expect(fn2).toHaveBeenCalledTimes(0);
	});
});
