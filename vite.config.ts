import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
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
	]
});
