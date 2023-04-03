import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'dist/index.mjs',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      nodeResolve(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/index.cjs',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      nodeResolve(),
    ],
  },
];
