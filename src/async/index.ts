import { EventAsync, Transform } from "../shared";
import { S, T } from "../private/constants";
import { pass } from "../private/utils";

export * from "../shared/functions";

export const eve = <I, O = I>(
  transform?: Transform<I, PromiseLike<O>>,
) => ({
  [S]: null,
  [T]: transform || (pass as Transform<I, PromiseLike<O>>),
}) as unknown as EventAsync<I, O>;

export const pub = async <I, O>(
	event: EventAsync<I, O>, 
	value: I
) => {
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
