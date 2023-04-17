import { clr, has, Lambda, sub, Subscriber } from "../src/index.js";
import { eve } from "../src/sync.js";
import { syncSuite } from "./utils/index.js";

const set = new Set<Subscriber<number, false>>();
const event$ = eve<number>();

let fn: Lambda<number, void>;

export const hasSuite = () =>
  syncSuite(
    "has",
    {
      set: function () {
        set.has(fn);
      },
      ueve: function () {
        has(event$, fn);
      },
    },
    {
      before: {
        set: () => {
          set.add((v) => console.log(v));
        },
        ueve: () => {
          sub(event$, (v) => console.log(v));
        },
      },
      after: {
        set: () => {
          set.clear();
        },
        ueve: () => {
          clr(event$);
        },
      },
    },
  );
