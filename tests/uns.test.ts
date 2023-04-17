import { S } from "../src/constants.js";
import { eve as eveAsync, sub as subAsync, uns } from "../src/async.js";
import { eve as eveSync, sub as subSync } from "../src/sync.js";
import { describe, it, expect, vi } from "vitest";

describe("uns", () => {
  describe("async", () => {
    it("should unsubscibe using result of subscription", () => {
      const fn = vi.fn();
      const click$ = eveAsync();
      const unsub = subAsync(click$, fn);

      unsub();

      expect(click$[S]?.size).toBe(0);
    });

    it("should unsubscibe by passing function reference", () => {
      const fn = vi.fn();
      const click$ = eveAsync();

      subAsync(click$, fn);
      uns(click$, fn);

      expect(click$[S]?.size).toBe(0);
    });
  });

  describe("sync", () => {
    it("should unsubscibe using result of subscription", () => {
      const fn = vi.fn();
      const click$ = eveSync();
      const unsub = subSync(click$, fn);

      unsub();

      expect(click$[S]?.size).toBe(0);
    });

    it("should unsubscibe by passing function reference", () => {
      const fn = vi.fn();
      const click$ = eveSync();

      subSync(click$, fn);
      uns(click$, fn);

      expect(click$[S]?.size).toBe(0);
    });
  });
});
