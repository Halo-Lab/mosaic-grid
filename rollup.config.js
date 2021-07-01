import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    typescript(),
    terser(),
    copy({
      targets: [
        { src: 'src/styles.css', dest: 'dist' },
        { src: 'package.json', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
