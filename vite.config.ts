import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

const root: string = process.cwd();
const regExps = (value: string, reg: string): string => {
	return value.replace(new RegExp(`^${reg}`, "g"), "");
};
const pathResolve = (dir: string): string => {
	return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
	"/@": pathResolve("src"),
	"@build": pathResolve("build")
};

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, root + '/env', '');
	return {
		base: env.VITE_PUBLIC_PATH,
		plugins: [vue()],
		resolve: { alias },  // 设置别名
		server: {
			https: false,  // 是否开启 https
			host: "0.0.0.0",  // 监听来自所有ip的请求
			port: env.VITE_PORT,  // 端口号
			proxy: {
				[env.VITE_PROXY_DOMAIN]: {
					target: env.VITE_PROXY_DOMAIN_REAL,
					// ws: true,
					changeOrigin: true,
					rewrite: (path: string) => regExps(path, env.VITE_PROXY_DOMAIN)
				}  // VITE_PROXY_DOMAIN 代理
			}  // 所有代理
		}  // 服务器配置
	}  // return change config
});