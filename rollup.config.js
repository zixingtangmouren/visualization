import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts', // 打包入口
  output: [
    {
      file: 'lib/sparrow.js', // 对于 Nodejs，打包成 commonjs
      format: 'cjs',
    },
    {
      file: 'esm/sparrow.js', // 对于浏览器，打包成 ES module
      format: 'es',
    },
    {
      file: 'dist/sparrow.min.js',
      name: 'sp',
      format: 'umd', // 对于 Nodejs 和浏览器，打包成混合模式
    },
  ],
  plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' }), typescript()],
};
