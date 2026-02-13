import react from '@vitejs/plugin-react-swc'

/** @type {import('tsdown').UserConfig} */
export const config = {
  clean: true,
  dts: true,
  entry: ['./index.ts'],
  external: ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  format: 'esm',
  minify: true,
  onSuccess: () => {
    console.info('Build successful')
  },
  outDir: './dist',
  platform: 'neutral',
  plugins: [react()],
  shims: true,
  sourcemap: false,
  target: 'esnext',
  treeshake: true,
}
