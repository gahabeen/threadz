import { declare } from '../../src/declare/declare';

export const api = declare(
  {
    test: {
      worker: (num1: number) => num1 + 10,
    },
  },
  {
    importKey: 'api',
  }
);