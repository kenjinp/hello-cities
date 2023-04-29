import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { getLastCommit } from './commitInfo';

const commitInfo = getLastCommit({});

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		__COMMIT_INFO__: JSON.stringify(commitInfo),
		__BUILD_INFO__: JSON.stringify({
			buildTime: Date.now()
		})
	},
	plugins: [react()]
});
