import { EventSync, Transform } from "../shared";
import { S, T } from "../private/constants";
import { pass } from "../private/utils";

export * from "../shared/functions";

export const eve = <I, O = I>(
  transform?: Transform<I, O>,
) => ({
  [S]: null,
  [T]: transform || (pass as Transform<I, O>),
}) as unknown as EventSync<I, O>;

export const pub = <I, O>(
	event: EventSync<I, O>, 
	value: I
) => {
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
