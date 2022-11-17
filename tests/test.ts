import { event } from "../src";

describe("Event", () => {
  it("should listen to event and publish value", async () => {
    let n = 0;

    const assign = jest.fn((v) => (n = v));
    const $e = event<number>();
    const unsub = await $e.listen(assign);

    expect(unsub).toBeDefined();

    await $e.publish(1);

    expect(assign).toHaveBeenCalledTimes(1);
    expect(n).toBe(1);
  });

  it("should unsubscribe listener", async () => {
    let n = 0;

    const listener = jest.fn(() => n++);
    const $e = event<number>();
    const unsub = await $e.listen(listener);

    await $e.publish(1);
    await unsub();
    await $e.publish(1);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(n).toBe(1);
  });

  it("should check if listener already exists", async () => {
    const listener = jest.fn();
    const $e = event<number>();

    await $e.listen(listener);

    const has = await $e.has(listener);

    expect(has).toBe(true);
  });

  it("should return number of listeners", async () => {
    const N = 5;
    const $e = event<number>();

    for (let i = 0; i < N; ++i) {
      await $e.listen(jest.fn());
    }

    const size = await $e.size();

    expect(size).toBe(N);
  });

  it("should clear all listeners", async () => {
    const N = 5;
    const $e = event<number>();

    for (let i = 0; i < N; ++i) {
      await $e.listen(jest.fn());
    }

    await $e.clear();

    const size = await $e.size();

    expect(size).toBe(0);
  });
});
