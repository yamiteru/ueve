import { S, T } from "./constants.js";
import { Transform, Either, EventAsync } from "./types.js";
import { pass } from "./utils.js";

export * from "./types.js";
export * from "./functions.js";

export const eve = <I, O = I>(
  transform?: Transform<I, PromiseLike<Either<undefined, O>>>,
) =>
  ({
    [S]: null,
    [T]: transform || (pass as Transform<I, PromiseLike<Either<undefined, O>>>),
  } as unknown as EventAsync<I, O>);

export const pub = async <I, O>(event: EventAsync<I, O>, value: I) => {
  const listeners = event[S];

  if (listeners) {
    const transformedValue = await event[T](value);

    if (transformedValue !== undefined) {
      const promises: Promise<void>[] = [];

      for (const subscriber of listeners.values()) {
        promises.push(subscriber(transformedValue));
      }

      await Promise.allSettled(promises);
    }
  }
};
