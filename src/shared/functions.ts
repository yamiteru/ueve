import { S } from "../private/constants";
import { EventAny, InferSubscriber } from "./types";

export const uns = <
	Event extends EventAny,
	Subscriber extends InferSubscriber<Event> 
>(
  event: Event,
  subscriber: Subscriber,
) => {
  event[S]?.delete(subscriber);
};

export const sub = <
	Event extends EventAny,
	Subscriber extends InferSubscriber<Event>
>(
  event: Event,
  subscriber: Subscriber,
) => {
  event[S] ??= new Set();
  event[S].add(subscriber);

  return () => uns(event, subscriber);
};

export const has = <
	Event extends EventAny,
	Subscriber extends InferSubscriber<Event>
>(
	event: Event,
  subscriber: Subscriber,
) => {
	return event[S]?.has(subscriber) || false;
};

export const clr = <
	Event extends EventAny,
>(event: Event) => {
  event[S]?.clear();
};
