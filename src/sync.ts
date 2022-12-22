import { Either, EventSync, Transform } from "./types";
import { S, T } from "./constants";
import { pass } from "./utils";

export * from "./types";
export * from "./functions";

export const eve = <I, O = I>(transform?: Transform<I, Either<undefined, O>>) =>
  ({
    [S]: null,
    [T]: transform || (pass as Transform<I, Either<undefined, O>>),
  } as unknown as EventSync<I, O>);

export const pub = <I, O>(event: EventSync<I, O>, value: I) => {
  const listeners = event[S];

  if (listeners) {
    const transformedValue = event[T](value);

    if (transformedValue !== undefined) {
      for (const subscriber of listeners.values()) {
        subscriber(transformedValue);
      }
    }
  }
};
