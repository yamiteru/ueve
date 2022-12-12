import { S, T } from "./constants";
import { EventEmitter, Subscriber, Transform } from "./types";
import { pass } from "./utils";

export const eve = <I, O = I>(
  transform?: Transform<I, O>,
): EventEmitter<I, O> => ({
  [S]: null,
  [T]: transform || (pass as Transform<I, O>),
});

export const uns = <I, O>(
  event: EventEmitter<I, O>,
  subscriber: Subscriber<O>,
) => {
  event[S]?.delete(subscriber);
};

export const sub = <I, O>(
  event: EventEmitter<I, O>,
  subscriber: Subscriber<O>,
) => {
  event[S] ??= new Set();
  event[S].add(subscriber);

  return () => uns(event, subscriber);
};

export const pub = async <I, O>(event: EventEmitter<I, O>, value: I) => {
  const listeners = event[S];

  if (listeners) {
    const TedValue = await event[T](value);

    if (TedValue !== undefined) {
      const promises: Promise<void>[] = [];

      for (const subscriber of listeners.values()) {
        promises.push(subscriber(TedValue));
      }

      await Promise.allSettled(promises);
    }
  }
};

export const has = <I, O>(
	event: EventEmitter<I, O>,
	subscriber: Subscriber<O>
) => {
	return event[S]?.has(subscriber) || false;
};

export const clr = <I, O>(event: EventEmitter<I, O>) => {
  event[S]?.clear();
};
