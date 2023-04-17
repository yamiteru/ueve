import { S } from "../src/constants.js";
import { eve as eveAsync, sub as subAsync, clr } from "../src/async.js";
import { eve as eveSync, sub as subSync } from "../src/sync.js";
import { describe, it, expect, vi } from "vitest";

describe("clr", () => {
  describe("async", () => {
    it("should clear event", () => {
      const fn1 = vi.fn();
      const fn2 = vi.fn();
      const fn3 = vi.fn();
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
      const fn1 = vi.fn();
      const fn2 = vi.fn();
      const fn3 = vi.fn();
      const click$ = eveSync();

      subSync(click$, fn1);
      subSync(click$, fn2);
      subSync(click$, fn3);

      clr(click$);

      expect(click$[S]?.size).toBe(0);
    });
  });
});
