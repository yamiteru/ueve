import { S } from "../src/constants.js";
import { eve as eveAsync, sub } from "../src/async.js";
import { eve as eveSync } from "../src/sync.js";
import { describe, it, expect, vi } from "vitest";

describe("sub", () => {
  describe("async", () => {
    it("should add subscriber", () => {
      const fn = vi.fn();
      const click$ = eveAsync<number>();

      sub(click$, fn);

      expect(click$[S]).toBeInstanceOf(Set);
      expect(click$[S]?.has(fn)).toBe(true);
    });

    it("should ignore duplicate subscriber", () => {
      const fn = vi.fn();
      const click$ = eveAsync<number>();

      sub(click$, fn);
      sub(click$, fn);
      sub(click$, fn);

      expect(click$[S]?.size).toBe(1);
    });

    it("should add multiple different subscibers", () => {
      const fn1 = vi.fn();
      const fn2 = vi.fn();
      const fn3 = vi.fn();
      const click$ = eveAsync<number>();

      sub(click$, fn1);
      sub(click$, fn2);
      sub(click$, fn3);

      expect(click$[S]?.size).toBe(3);
    });

    it("should return unsubscribe function", () => {
      const fn = vi.fn();
      const click$ = eveAsync();
      const unsub = sub(click$, fn);

      expect(unsub).toBeDefined();
      expect(unsub).toBeInstanceOf(Function);
    });
  });

  describe("sync", () => {
    it("should add subscriber", () => {
      const fn = vi.fn();
      const click$ = eveSync<number>();

      sub(click$, fn);

      expect(click$[S]).toBeInstanceOf(Set);
      expect(click$[S]?.has(fn)).toBe(true);
    });

    it("should ignore duplicate subscriber", () => {
      const fn = vi.fn();
      const click$ = eveSync<number>();

      sub(click$, fn);
      sub(click$, fn);
      sub(click$, fn);

      expect(click$[S]?.size).toBe(1);
    });

    it("should add multiple different subscibers", () => {
      const fn1 = vi.fn();
      const fn2 = vi.fn();
      const fn3 = vi.fn();
      const click$ = eveSync<number>();

      sub(click$, fn1);
      sub(click$, fn2);
      sub(click$, fn3);

      expect(click$[S]?.size).toBe(3);
    });

    it("should return unsubscribe function", () => {
      const fn = vi.fn();
      const click$ = eveSync();
      const unsub = sub(click$, fn);

      expect(unsub).toBeDefined();
      expect(unsub).toBeInstanceOf(Function);
    });
  });
});
