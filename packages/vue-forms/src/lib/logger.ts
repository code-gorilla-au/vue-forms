export interface LoggerOptions {
  debug: boolean;
}
export function logger({ debug }: LoggerOptions) {
  return {
    log(...args: unknown[]) {
      if (!debug) {
        return;
      }
      console.log(args);
    },
    warn(...args: unknown[]) {
      if (!debug) {
        return;
      }
      console.warn(args);
    },
    error(...args: unknown[]) {
      if (!debug) {
        return;
      }
      console.error(args);
    },
  };
}
