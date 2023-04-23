import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    external: ['vue'],
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
    external: ['vue'],
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
