import { eve as eveSync, pub as pubSync, sub } from "../src/sync.js";
import { eve as eveAsync, pub as pubAsync } from "../src/async.js";

const doubleSync = eveSync<number>((v) => v * 2);

sub(doubleSync, (v) => console.log(v));

for (let i = 0; i < 5; ++i) {
  pubSync(doubleSync, i);
}

// 0
// 2
// 4
// 6
// 8

const doubleAsync = eveAsync<number>(
  // it multiplies input after random
  // number of ms in the range of <0, 100>
  (v) =>
    new Promise((resolve) =>
      setTimeout(() => resolve(v * 2), Math.random() * 100),
    ),
);

sub(doubleAsync, async (v) => console.log(v));

for (let i = 0; i < 5; ++i) {
  pubAsync(doubleAsync, i);
}

// 8
// 0
// 2
// 6
// 4

// The output is random so it can be different on every run
