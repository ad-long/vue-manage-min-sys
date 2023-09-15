import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { usePermissStore } from './store/permiss';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 自定义权限指令
const permiss = usePermissStore();
app.directive('permiss', {
  mounted(el, binding) {
    if (!permiss.key.includes(String(binding.value))) {
      el['hidden'] = true;
    }
  },
});

app.mount('#app');
