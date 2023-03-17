import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const root: string = process.cwd();

// 跨域代理重写
const regExps = (value: string, reg: string): string => {
	return value.replace(new RegExp(`^${reg}`, "g"), "");
};

// 路径查找
const pathResolve = (dir: string): string => {
	return resolve(__dirname, ".", dir);
};

// 设置别名
const alias: Record<string, string> = {
	"/@": pathResolve("src"),
	"@build": pathResolve("build")
};

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, root + '/env', '');

	return {
		base: env.VITE_PUBLIC_PATH,
		plugins: [
			vue(),
			VueSetupExtend(),
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				// dirs 指定组件所在位置，默认为 src/components
				// 可以让我们使用自己定义组件的时候免去 import 的麻烦
				dirs: ['src/components/'],

				// 配置需要将哪些后缀类型的文件进行自动按需引入
				extensions: ['vue', 'md'],
				resolvers: [ElementPlusResolver()]
			})
		],
		resolve: { alias },
		server: {
			// 是否开启 https
			https: false,

			// 端口号
			host: "0.0.0.0",
			port: env.VITE_PORT,

			// 本地跨域代理
			proxy: {
				[env.VITE_PROXY_DOMAIN]: {
					target: env.VITE_PROXY_DOMAIN_REAL,
					// ws: true,
					changeOrigin: true,
					rewrite: (path: string) => regExps(path, env.VITE_PROXY_DOMAIN)
				}
			}
		}
	}
}
);

