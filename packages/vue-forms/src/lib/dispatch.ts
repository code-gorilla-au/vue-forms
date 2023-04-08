export interface DispatcherOptions {
  debug?: boolean;
}

export type DispatchEventTopic = string;
export const LOG_DEBUG = 'log.debug';
export const LOG_WARN = 'log.warn';

export type DispatchFunction = (
  opts: DispatcherOptions,
  payload: DispatchEventPayload,
) => void;

export interface DispatchEventPayload {
  id: string;
  [key: string]: string | number | Date | object;
}

export interface EventPayload {
  timestamp: number;
  payload: DispatchEventPayload;
}

export interface DispatcherState {
  [key: DispatchEventTopic]: DispatchFunction[];
}

export function dispatcher(opts: DispatcherOptions = { debug: false }) {
  const state: DispatcherState = {};

  return {
    subscribe(topic: DispatchEventTopic, fn: DispatchFunction) {
      if (!state[topic]) {
        state[topic] = [];
        return;
      }
      state[topic] = [...state[topic], fn];
    },

    async dispatch(topic: DispatchEventTopic, payload: DispatchEventPayload) {
      return new Promise((resolve, reject) => {
        try {
          state[topic].forEach((fn) => {
            fn(opts, payload);
          });
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
