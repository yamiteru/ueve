import {
  eve as eveAsync,
  sub as subAsync,
  pub as pubAsync,
} from "../src/async";
import { eve as eveSync, sub as subSync, pub as pubSync } from "../src/sync";

describe("pub", () => {
  describe("async", () => {
    it("should publish valid value to all subscribers", async () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const click$ = eveAsync<number>();

      subAsync(click$, fn1);
      subAsync(click$, fn2);

      await pubAsync(click$, 1);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
    });

    it("should publish transformed value to all subscribers", async () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const click$ = eveAsync<number>(async (v) => v * 2);

      subAsync(click$, fn1);
      subAsync(click$, fn2);

      await pubAsync(click$, 1);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn1).toHaveBeenLastCalledWith(2);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenLastCalledWith(2);
    });

    it("should not publish invalid transformed value to any subscriber", async () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const click$ = eveAsync<number>(async () => undefined);

      subAsync(click$, fn1);
      subAsync(click$, fn2);

      await pubAsync(click$, 1);

      expect(fn1).toHaveBeenCalledTimes(0);
      expect(fn2).toHaveBeenCalledTimes(0);
    });
  });

  describe("sync", () => {
    it("should publish valid value to all subscribers", () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const click$ = eveSync<number>();

      subSync(click$, fn1);
      subSync(click$, fn2);

      pubSync(click$, 1);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
    });

    it("should publish transformed value to all subscribers", () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const click$ = eveSync<number>((v) => v * 2);

      subSync(click$, fn1);
      subSync(click$, fn2);

      pubSync(click$, 1);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn1).toHaveBeenLastCalledWith(2);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenLastCalledWith(2);
    });

    it("should not publish invalid transformed value to any subscriber", () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      const click$ = eveSync<number>(() => undefined);

      subAsync(click$, fn1);
      subAsync(click$, fn2);

      pubSync(click$, 1);

      expect(fn1).toHaveBeenCalledTimes(0);
      expect(fn2).toHaveBeenCalledTimes(0);
    });
  });
});
