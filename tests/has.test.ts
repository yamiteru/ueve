import { eve as eveAsync, sub as subAsync, has } from "../src/async.js";
import { eve as eveSync, sub as subSync } from "../src/sync.js";
import { describe, it, expect, vi } from "vitest";

describe("has", () => {
  describe("async", () => {
    it("should return true if event has subscriber", () => {
      const fn = vi.fn();
      const click$ = eveAsync();

      subAsync(click$, fn);

      expect(has(click$, fn)).toBe(true);
    });

    it("should return false if event does not have subscriber", () => {
      const fn = vi.fn();
      const click$ = eveAsync();

      expect(has(click$, fn)).toBe(false);
    });
  });

  describe("sync", () => {
    it("should return true if event has subscriber", () => {
      const fn = vi.fn();
      const click$ = eveSync();

      subSync(click$, fn);

      expect(has(click$, fn)).toBe(true);
    });

    it("should return false if event does not have subscriber", () => {
      const fn = vi.fn();
      const click$ = eveSync();

      expect(has(click$, fn)).toBe(false);
    });
  });
});
