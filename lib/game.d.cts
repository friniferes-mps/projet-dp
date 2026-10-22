export function createEngine(saved: unknown, origin: string): {
  handle(method: string, pathname: string, data?: object): Promise<{status: number; payload: unknown}>;
  getGame(): unknown;
};
