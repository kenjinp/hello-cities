import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getLastCommit } from './commitInfo';
const commitInfo = getLastCommit({});

// https://vitejs.dev/config/
export default defineConfig({
	assetsInclude: ['**/*.wav'],
	define: {
		__COMMIT_INFO__: JSON.stringify(commitInfo),
		__BUILD_INFO__: JSON.stringify({
			buildTime: Date.now()
		})
	},
	plugins: [
		tsconfigPaths(),
		react(),
		{
			name: 'configure-response-headers',
			configureServer: server => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					next();
				});
			}
		}
	]
});
