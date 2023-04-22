import { logger } from './logger';

export interface DispatcherOptions {
  debug?: boolean;
}

export type DispatchEventTopic = string;

export type DispatchFunction<T> = (
  opts: DispatcherOptions,
  event: DispatchEventPayload<T>,
) => void;

export interface DispatchEventPayload<T> {
  id: string;
  timestamp: number;
  payload: T;
}

export interface DispatcherState<T> {
  [key: DispatchEventTopic]: DispatchFunction<T>[];
}

export function dispatcher<T>(opts: DispatcherOptions = { debug: false }) {
  const log = logger({ debug: opts.debug ?? false });
  const state: DispatcherState<T> = {};

  return {
    topics() {
      return Object.keys(state);
    },

    subscribe(topic: DispatchEventTopic, fn: DispatchFunction<T>) {
      if (!state[topic]) {
        log.log(`registering new topic: ${topic}`);
        state[topic] = [fn];
        return;
      }
      log.log(`adding subscriber for topic: ${topic}`);
      state[topic] = [...state[topic], fn];
    },

    async dispatch(
      topic: DispatchEventTopic,
      payload: DispatchEventPayload<T>,
    ) {
      return new Promise((resolve, reject) => {
        try {
          state[topic].forEach((fn) => {
            fn(opts, payload);
          });
          log.log(`event dispatched for topic: ${topic}`);
          resolve(null);
        } catch (error) {
          log.error(`${topic} dispatch error `, error);
          reject(error);
        }
      });
    },
  };
}
