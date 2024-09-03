# test_game

## 运行指令

```
npm install 依赖安装
npm run serve: 开发环境
npm run build: 生产环境
node live-server.js 预览打包后dist文件
```

## `.env.production` `.env.development`环境变量配置

- 开启 rem 单位转换： AUTOPX2REM
- 静态路径前缀： VUE_APP_PUBLICPATH，设置不同环境 publicPath
- 接口前缀： VUE_APP_BASEURL，设置不同环境 axios 的 baseURL

## px2remvw 插件配置

一个将 px 单位换算为 rem/vw/vmin 并支持多种配置的插件，针对移动端兼容性问题也可同时转换为 rem/vw。

支持的配置项说明：

- viewportWidth: 针对 vw 的基础视图宽度尺寸，默认值为 750，设置为 false 或 0 时关闭转换
- viewportUnit: 配置转换的单位，支持 vw 和 vmin，默认值为 vw
- remRoot: rem 依据的 html 根元素字体大小，默认值为 100，设置为 false 或 0 时关闭转换
- minPixelValue: 小于等于该最小值时不转换，默认值为 1px
- unitPrecision: 换算后小数点后精度位数，默认值为 5 位
- ignoreProperty: 过滤不做转换处理的属性，如['border']，默认值为空数组[]
- exclude: 过滤不做转换处理的文件目录，格式为正则表达式，如/node_modules/，默认值为 false
- no|px: 单条 css 样式不做转换处理时可在末尾增加该关键字注释

## pwa

pwa 的应用信息，可以在项目根目录 vue.config.js 中进行配置

#### 配置以文档为准

- https://cli.vuejs.org/config/#pwa
- https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
- https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin

## 其他要求

- `文件引入使用 alias 别名

  ```
  示例：
  import LeftBox from "@/components/left_box.vue";

  //@指向的目录是src
  ```

- 文件命名 采用大驼峰命名法，所有单词的第一个字母大写，命名要简洁且可读

- 采用统一的自动化格式方案
