import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript';

export default [
  {
    input: './src/index.ts',
    output: {
      format: 'esm',
      file: 'dist/index.mjs',
    },
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue(),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/index.cjs',
    },
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015',
      }),
      vue(),
    ],
  },
];
