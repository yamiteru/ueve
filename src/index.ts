type Listener<T> = (data: T) => Promise<unknown> | unknown;

export const event = <T>() => {
  let listeners: Set<Listener<T>> | null = null;

  return {
    listen: async (listener: Listener<T>) => {
      listeners ??= new Set();
      listeners.add(listener);

      return async () => {
        listeners?.delete(listener);
      };
    },
    publish: async (data: T) => {
      if (listeners) {
        const promises: unknown[] = [];

        for (const listener of listeners.values()) {
          promises.push(listener(data));
        }

        await Promise.all(promises);
      }
    },
    size: async () => {
      return listeners?.size || 0;
    },
    has: async (listener: Listener<T>) => {
      return listeners?.has(listener) || false;
    },
    clear: async () => {
      listeners?.clear();
    },
  };
};
