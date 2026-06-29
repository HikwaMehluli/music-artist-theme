import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: false,
		rollupOptions: {
			input: 'src/js/_entry.js',
			output: {
				entryFileNames: 'app.js',
				format: 'iife',
			},
		},
	},
})
