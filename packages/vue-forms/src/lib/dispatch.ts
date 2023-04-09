import { logger } from './logger';

export interface DispatcherOptions {
  debug?: boolean;
}

export type DispatchEventTopic = string;

export type DispatchFunction = (
  opts: DispatcherOptions,
  payload: DispatchEventPayload,
) => void;

export interface DispatchEventPayload {
  id: string;
  timestamp: number;
  [key: string]: string | number | Date | object;
}

export interface DispatcherState {
  [key: DispatchEventTopic]: DispatchFunction[];
}

export function dispatcher(opts: DispatcherOptions = { debug: false }) {
  const log = logger({ debug: opts.debug ?? false });
  const state: DispatcherState = {};

  return {
    topics() {
      return Object.keys(state);
    },

    subscribe(topic: DispatchEventTopic, fn: DispatchFunction) {
      if (!state[topic]) {
        log.log(`registering new topic: ${topic}`);
        state[topic] = [fn];
        return;
      }
      log.log(`adding subscriber for topic: ${topic}`);
      state[topic] = [...state[topic], fn];
    },

    async dispatch(topic: DispatchEventTopic, payload: DispatchEventPayload) {
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
