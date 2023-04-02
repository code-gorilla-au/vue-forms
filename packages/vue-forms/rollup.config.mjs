import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';

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
      vue(),
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
      vue(),
    ],
  },
];
