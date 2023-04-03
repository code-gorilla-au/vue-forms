import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

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
      terser(),
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
      terser(),
    ],
  },
];
