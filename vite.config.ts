import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
//@ts-ignore
const env = loadEnv(process.env.NODE_ENV, process.cwd())
console.log(env)

// https://vitejs.dev/config/
export default defineConfig({
  // 项目根目录访问路径
  base: '/',
  // 修改打包根目录路径
  build: {
    // 打包后的文件夹名称
    outDir: 'dist',
    // 打包后的静态资源存放路径
    assetsDir: 'assetss'
  },
  server: {
    // 配置域名访问
    // host: '0.0.0.0',
    // 端口号
    // port: 9999,
    // 是否自动打开浏览器
    open: true,
    // 当前端口号被占用时，直接退出服务，不用新增端口号
    strictPort: true,
    // 配置跨域服务
    proxy: {
      // 代理标识
      [env.VITE_BASE_API]: {
        // 目标服务器地址
        target: env.VITE_PROXY_URL,
        // 是否开启跨域代理
        changeOrigin: true,
        // 是否重写路径
        rewrite: (path) => path.replace(/^\/env.VITE_BASE_API/, '')
      }
    }
  },
  // 开发服务器配置
  plugins: [
    vue(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      //存放的位置
      dts: 'src/auto-import.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
