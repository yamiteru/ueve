import { eve, EventSync } from "../src/sync";
import { syncSuite } from "./utils";

let set: Set<any>;
let event$: EventSync<any, any>;

export const initSuite = () =>
  syncSuite("init", {
    set: function () {
      set = new Set();
    },
    ueve: function () {
      event$ = eve();
    },
  });
